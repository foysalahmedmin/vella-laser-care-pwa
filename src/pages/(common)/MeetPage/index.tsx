import { URLS } from "@/config";
import useLanguage from "@/hooks/states/useLanguage";
import { cn } from "@/lib/utils";
import { fetchMe } from "@/services/auth.service";
import { Loader2, Users, Video } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

const MeetPage = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { language } = useLanguage();
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const [jitsiApi, setJitsiApi] = useState<any>(null);
  const [isJitsiLoaded, setIsJitsiLoaded] = useState(false);

  const { data: me, isLoading } = useQuery({
    queryKey: "me",
    queryFn: () => fetchMe(),
  });

  const onReadyToClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Load Jitsi Meet External API
  useEffect(() => {
    const loadJitsiScript = () => {
      if (window.JitsiMeetExternalAPI) {
        setIsJitsiLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://meet.admissionsassist.com/external_api.js";
      script.onload = () => {
        setIsJitsiLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load Jitsi Meet External API");
      };
      document.head.appendChild(script);
    };

    loadJitsiScript();
  }, []);

  // Initialize Jitsi Meet
  useEffect(() => {
    if (!isJitsiLoaded || isLoading || !jitsiContainerRef.current || !me) {
      return;
    }

    const domain = "meet.admissionsassist.com";
    const options = {
      roomName: id || "hello",
      width: "100%",
      height: "100%",
      parentNode: jitsiContainerRef.current,
      configOverwrite: {
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: true,
        enableEmailInStats: false,
        enableNoAudioDetection: true,
        disableShowMoreStats: true,
        enableNoisyMicDetection: true,
        localRecording: {
          disable: false,
          notifyAllParticipants: false,
          disableSelfRecording: false,
        },
        toolbarButtons: [
          "camera",
          "chat",
          "closedcaptions",
          "desktop",
          "dock-iframe",
          "etherpad",
          "filmstrip",
          "fullscreen",
          "hangup",
          "highlight",
          "linktosalesforce",
          "livestreaming",
          "microphone",
          "noisesuppression",
          "participants-pane",
          "profile",
          "raisehand",
          "recording",
          "security",
          "select-background",
          "settings",
          "shareaudio",
          "sharedvideo",
          "shortcuts",
          "tileview",
          "toggle-camera",
          "undock-iframe",
          "videoquality",
          "whiteboard",
        ],
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          "camera",
          "chat",
          "closedcaptions",
          "desktop",
          "dock-iframe",
          "etherpad",
          "filmstrip",
          "fullscreen",
          "hangup",
          "highlight",
          "linktosalesforce",
          "livestreaming",
          "microphone",
          "noisesuppression",
          "participants-pane",
          "profile",
          "raisehand",
          "recording",
          "security",
          "select-background",
          "settings",
          "shareaudio",
          "sharedvideo",
          "shortcuts",
          "tileview",
          "toggle-camera",
          "undock-iframe",
          "videoquality",
          "whiteboard",
        ],
        SETTINGS_SECTIONS: [
          "devices",
          "language",
          "moderator",
          "profile",
          "calendar",
        ],
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        DEFAULT_BACKGROUND: "#474747",
        DISABLE_VIDEO_BACKGROUND: false,
      },
      userInfo: {
        displayName: me?.name || "User",
        email: me?.email || "",
        avatarURL: me?.photo ? `${URLS?.user_photos}/${me?.photo}` : undefined,
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    // Event listeners
    api.addEventListener("readyToClose", onReadyToClose);
    api.addEventListener("videoConferenceJoined", () => {
      console.log("Video conference joined");
    });
    api.addEventListener("videoConferenceLeft", () => {
      console.log("Video conference left");
      onReadyToClose();
    });

    setJitsiApi(api);

    return () => {
      if (api) {
        api.dispose();
      }
    };
  }, [isJitsiLoaded, isLoading, me, id, onReadyToClose]);

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900",
          className,
        )}
      >
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          <p className="text-muted-foreground dark:text-muted-foreground text-sm">
            {language.code === "bn" ? "লোড হচ্ছে..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (!isJitsiLoaded) {
    return (
      <div
        className={cn(
          "flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900",
          className,
        )}
      >
        <div className="flex flex-col items-center space-y-4">
          <Video className="text-primary h-12 w-12 animate-pulse" />
          <p className="text-muted-foreground dark:text-muted-foreground text-sm">
            {language.code === "bn"
              ? "মিটিং লোড হচ্ছে..."
              : "Loading meeting..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative h-screen w-full bg-black", className)}>
      {/* Meeting Container */}
      <div
        ref={jitsiContainerRef}
        className="h-full w-full"
        style={{ minHeight: "100vh" }}
      />

      {/* Custom overlay controls (optional) */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center space-x-2 rounded-lg bg-black/50 px-3 py-2 backdrop-blur-sm">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-sm font-medium text-white">
            {language.code === "bn" ? "সংযুক্ত" : "Connected"}
          </span>
        </div>
      </div>

      {/* Room info */}
      <div className="absolute top-4 right-4 z-10">
        <div className="rounded-lg bg-black/50 px-3 py-2 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-white" />
            <span className="text-sm text-white">
              {language.code === "bn" ? "রুম" : "Room"}: {id || "hello"}
            </span>
          </div>
        </div>
      </div>

      {/* User info display */}
      {me && (
        <div className="absolute bottom-4 left-4 z-10">
          <div className="flex items-center space-x-3 rounded-lg bg-black/50 px-3 py-2 backdrop-blur-sm">
            {me.photo && (
              <img
                src={`${URLS?.user_photos}/${me.photo}`}
                alt={me.name || "User"}
                className="h-8 w-8 rounded-full border-2 border-white/20"
              />
            )}
            <div>
              <p className="text-sm font-medium text-white">{me.name}</p>
              <p className="text-xs text-white/70">{me.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetPage;
