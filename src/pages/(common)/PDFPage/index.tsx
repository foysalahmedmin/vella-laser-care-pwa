import useLanguage from "@/hooks/states/useLanguage";
import { cn } from "@/lib/utils";
import { ArrowLeft, Download, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";

interface PdfViewerState {
  numPages: number | null;
  pageNumber: number;
  scale: number;
  rotation: number;
  loading: boolean;
  error: string | null;
}

const PDFPage = ({ className }: { className?: string }) => {
  const { pdfUrl } = useParams<{ pdfUrl: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [pdfState, setPdfState] = useState<PdfViewerState>({
    numPages: null,
    pageNumber: 1,
    scale: 1.0,
    rotation: 0,
    loading: true,
    error: null,
  });

  // Decode the PDF URL from params
  const decodedPdfUrl = pdfUrl ? decodeURIComponent(pdfUrl) : null;

  const handleDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      console.log("🚀 ~ PDF Load Complete ~ numPages:", numPages);
      console.log(`Number of pages: ${numPages}`);

      setPdfState((prev) => ({
        ...prev,
        numPages,
        loading: false,
        error: null,
      }));
    },
    [],
  );

  const handleDocumentLoadError = useCallback((error: Error) => {
    console.error("PDF Load Error:", error);
    setPdfState((prev) => ({
      ...prev,
      loading: false,
      error: error.message || "Failed to load PDF",
    }));
  }, []);

  const handlePageChange = useCallback(
    (newPageNumber: number) => {
      if (newPageNumber >= 1 && newPageNumber <= (pdfState.numPages || 1)) {
        setPdfState((prev) => ({
          ...prev,
          pageNumber: newPageNumber,
        }));
      }
    },
    [pdfState.numPages],
  );

  const handleZoomIn = useCallback(() => {
    setPdfState((prev) => ({
      ...prev,
      scale: Math.min(prev.scale + 0.25, 3.0),
    }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setPdfState((prev) => ({
      ...prev,
      scale: Math.max(prev.scale - 0.25, 0.5),
    }));
  }, []);

  const handleRotate = useCallback(() => {
    setPdfState((prev) => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360,
    }));
  }, []);

  const handleDownload = useCallback(() => {
    if (decodedPdfUrl) {
      const link = document.createElement("a");
      link.href = decodedPdfUrl;
      link.download = "prescription.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [decodedPdfUrl]);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (!decodedPdfUrl) {
    return (
      <div className={cn("min-h-screen bg-gray-50", className)}>
        <div className="bg-card border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoBack}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              aria-label="Go back"
            >
              <ArrowLeft className="text-muted-foreground h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {language.code === "bn" ? "প্রেসক্রিপশন" : "Prescription"}
            </h1>
          </div>
        </div>

        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">
              {language.code === "bn"
                ? "পিডিএফ URL পাওয়া যায়নি"
                : "No PDF URL provided"}
            </p>
            <button
              onClick={handleGoBack}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              {language.code === "bn" ? "ফিরে যান" : "Go Back"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex min-h-screen flex-col bg-gray-50", className)}>
      {/* Header */}
      <div className="bg-card sticky top-0 z-10 border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoBack}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              aria-label="Go back"
            >
              <ArrowLeft className="text-muted-foreground h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {language.code === "bn" ? "প্রেসক্রিপশন" : "Prescription"}
            </h1>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              aria-label="Zoom out"
              disabled={pdfState.scale <= 0.5}
            >
              <ZoomOut className="text-muted-foreground h-4 w-4" />
            </button>

            <span className="text-muted-foreground min-w-[60px] text-center text-sm">
              {Math.round(pdfState.scale * 100)}%
            </span>

            <button
              onClick={handleZoomIn}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              aria-label="Zoom in"
              disabled={pdfState.scale >= 3.0}
            >
              <ZoomIn className="text-muted-foreground h-4 w-4" />
            </button>

            <button
              onClick={handleRotate}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              aria-label="Rotate"
            >
              <RotateCw className="text-muted-foreground h-4 w-4" />
            </button>

            <button
              onClick={handleDownload}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              aria-label="Download"
            >
              <Download className="text-muted-foreground h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Page Navigation */}
        {pdfState.numPages && (
          <div className="mt-3 flex items-center justify-center gap-4 border-t border-gray-100 pt-3">
            <button
              onClick={() => handlePageChange(pdfState.pageNumber - 1)}
              disabled={pdfState.pageNumber <= 1}
              className="rounded bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {language.code === "bn" ? "পূর্ববর্তী" : "Previous"}
            </button>

            <span className="text-muted-foreground text-sm">
              {language.code === "bn"
                ? `পৃষ্ঠা ${pdfState.pageNumber} / ${pdfState.numPages}`
                : `Page ${pdfState.pageNumber} of ${pdfState.numPages}`}
            </span>

            <button
              onClick={() => handlePageChange(pdfState.pageNumber + 1)}
              disabled={pdfState.pageNumber >= pdfState.numPages}
              className="rounded bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {language.code === "bn" ? "পরবর্তী" : "Next"}
            </button>
          </div>
        )}
      </div>

      {/* PDF Viewer */}
      <div className="flex flex-1 items-center justify-center p-4">
        {pdfState.loading && (
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-muted-foreground">
              {language.code === "bn"
                ? "পিডিএফ লোড হচ্ছে..."
                : "Loading PDF..."}
            </p>
          </div>
        )}

        {pdfState.error && (
          <div className="text-center">
            <p className="mb-4 text-red-500">
              {language.code === "bn"
                ? "পিডিএফ লোড করতে ত্রুটি হয়েছে"
                : "Error loading PDF"}
            </p>
            <p className="text-muted-foreground mb-4 text-sm">
              {pdfState.error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              {language.code === "bn" ? "পুনরায় চেষ্টা করুন" : "Retry"}
            </button>
          </div>
        )}

        {!pdfState.loading && !pdfState.error && (
          <div className="w-full max-w-4xl">
            <iframe
              src={`${decodedPdfUrl}#page=${pdfState.pageNumber}&zoom=${pdfState.scale * 100}`}
              className="h-[70vh] w-full rounded-lg border border-gray-300 shadow-sm"
              style={{
                transform: `rotate(${pdfState.rotation}deg)`,
                transformOrigin: "center center",
              }}
              onLoad={() => handleDocumentLoadSuccess({ numPages: 1 })}
              onError={() =>
                handleDocumentLoadError(
                  new Error("Failed to load PDF in iframe"),
                )
              }
              title="PDF Viewer"
            />
          </div>
        )}
      </div>

      {/* Alternative: If iframe doesn't work, show a link to view PDF */}
      {!pdfState.loading && !pdfState.error && (
        <div className="bg-card border-t border-gray-200 p-4">
          <div className="text-center">
            <p className="text-muted-foreground mb-2 text-sm">
              {language.code === "bn"
                ? "পিডিএফ দেখতে সমস্যা হচ্ছে? নিচের লিঙ্কে ক্লিক করুন"
                : "Having trouble viewing the PDF? Click the link below"}
            </p>
            <a
              href={decodedPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary inline-flex items-center gap-2 underline hover:text-blue-700"
            >
              {language.code === "bn" ? "নতুন ট্যাবে খুলুন" : "Open in new tab"}
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFPage;
