import useUser from "@/hooks/states/useUser";
import {
  SetAppointmentType,
  SetDate,
  SetDepartment,
  SetSlot,
} from "@/redux/slices/appointment-slice";
import type { RootState } from "@/redux/store";
import clsx from "clsx";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Laptop,
  MapPin,
  Stethoscope,
} from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

// Types
interface DayItem {
  id: string;
  day: number;
  name: string;
  year: string;
  month: string;
}

interface Slot {
  _id: string;
  name: string;
}

interface Department {
  _id: string;
  name: string;
}

// Appointment Calendar Component
export function AppointmentCalendar() {
  const dispatch = useDispatch();
  const { date } = useSelector((state: any) => state.appointment);
  const [today] = useState(moment().format("MMM DD, YYYY"));
  const [startIndex, setStartIndex] = useState(0);

  const days: DayItem[] = Array.from({ length: 15 }, (_, i) => {
    const day = moment().add(i, "days");
    return {
      id: i.toString(),
      day: day.date(),
      name: day.format("ddd"),
      year: day.format("YYYY"),
      month: day.format("MM"),
    };
  });

  const visibleDays = days.slice(startIndex, startIndex + 5);

  const navigateDays = (direction: "left" | "right") => {
    if (direction === "left" && startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else if (direction === "right" && startIndex < days.length - 5) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="mt-2 bg-white p-4">
      <p className="font-semibold text-slate-600">{today}</p>
      <p className="text-lg font-bold">Today</p>

      <div className="mt-2 flex items-center">
        <button
          onClick={() => navigateDays("left")}
          className="p-2 disabled:opacity-50"
          disabled={startIndex === 0}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex flex-1 justify-between">
          {visibleDays.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                dispatch(SetDate(`${item.year}-${item.month}-${item.day}`))
              }
              className={clsx(
                "flex flex-col items-center rounded-2xl px-4 py-2",
                date === `${item.year}-${item.month}-${item.day}`
                  ? "bg-blue-100 text-blue-500"
                  : "text-slate-600",
              )}
            >
              <span className="text-lg font-bold">{item.day}</span>
              <span className="text-sm">{item.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => navigateDays("right")}
          className="p-2 disabled:opacity-50"
          disabled={startIndex >= days.length - 5}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

// Appointment Type Component
export function AppointmentType() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { appointment_type } = useSelector(
    (state: RootState) => state.appointment,
  );

  const handleAppointmentType = (type: "online" | "offline") => {
    if (user.role === "parlor") return;

    if (appointment_type === type) {
      dispatch(SetAppointmentType(""));
    } else {
      dispatch(SetAppointmentType(type));
    }
  };

  return (
    <div className="bg-white p-4 pb-6">
      <p className="text-md font-bold">Appointment Type</p>
      <div className="mt-4 flex justify-between gap-2">
        <button
          onClick={() => handleAppointmentType("online")}
          className={clsx(
            "flex flex-1 items-center justify-center gap-2 rounded-full py-3",
            appointment_type === "online"
              ? "bg-blue-500 text-white"
              : "border border-blue-500 text-blue-500",
          )}
        >
          <Laptop size={18} />
          <span className="font-semibold">Online</span>
        </button>

        <button
          onClick={() => handleAppointmentType("offline")}
          className={clsx(
            "flex flex-1 items-center justify-center gap-2 rounded-full py-3",
            appointment_type === "offline"
              ? "bg-blue-500 text-white"
              : "border border-blue-500 text-blue-500",
          )}
        >
          <MapPin size={18} />
          <span className="font-semibold">Offline</span>
        </button>
      </div>
    </div>
  );
}

// Choose Hours Component
export function ChooseHours() {
  const dispatch = useDispatch();
  const { date, slot } = useSelector((state: RootState) => state.appointment);

  // Mock slots data - replace with actual API call
  const slots: Slot[] = [
    { _id: "1", name: "9:00 AM" },
    { _id: "2", name: "10:00 AM" },
    { _id: "3", name: "11:00 AM" },
    { _id: "4", name: "1:00 PM" },
    { _id: "5", name: "2:00 PM" },
    { _id: "6", name: "3:00 PM" },
  ];

  return (
    <div className="bg-white p-4 pt-4">
      <p className="text-md flex items-center gap-2 font-bold">
        <Clock size={18} />
        Choose the hours
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {slots.map((item) => (
          <button
            key={item._id}
            onClick={() => dispatch(SetSlot(item._id))}
            className={clsx(
              "rounded-lg py-3",
              slot === item._id
                ? "bg-primary text-primary-foreground"
                : "bg-gray-100 text-gray-700",
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// Your Problem Component
export function YourProblem({ doctorId }: { doctorId: string }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { appointment_type, date, slot, department } = useSelector(
    (state: RootState) => state.appointment,
  );

  // Mock departments data - replace with actual API call
  const departments: Department[] = [
    { _id: "1", name: "Dermatology" },
    { _id: "2", name: "Cardiology" },
    { _id: "3", name: "Neurology" },
    { _id: "4", name: "Pediatrics" },
    { _id: "5", name: "Orthopedics" },
    { _id: "6", name: "Ophthalmology" },
  ];

  const handleNext = () => {
    if (!appointment_type || !date || !slot || !department || !doctorId) {
      alert("Please select all fields!");
    } else {
      navigate(`/patient-information/${doctorId}`);
    }
  };

  return (
    <div className="bg-white p-4 pt-4">
      <p className="text-md flex items-center gap-2 font-bold">
        <Stethoscope size={18} />
        Your Problem
      </p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {departments.map((item) => (
          <button
            key={item._id}
            onClick={() =>
              dispatch(SetDepartment(department === item._id ? "" : item._id))
            }
            className={clsx(
              "rounded-full py-3 text-sm",
              department === item._id
                ? "bg-primary text-primary-foregrounds"
                : "bg-gray-100 text-gray-700",
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="bg-primary text-primary-foreground mt-6 w-full rounded-2xl py-3 font-bold"
      >
        NEXT
      </button>
    </div>
  );
}

// Book Appointment Component
export default function DoctorsBookingPage() {
  const { id } = useParams();

  return (
    <div className="mx-auto min-h-screen max-w-md bg-gray-50">
      <header className="border-b p-4">
        <h1 className="text-xl font-bold">Book an Appointment</h1>
      </header>

      <AppointmentType />
      <AppointmentCalendar />
      <ChooseHours />
      <YourProblem doctorId={id as string} />
    </div>
  );
}
