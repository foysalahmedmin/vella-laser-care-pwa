import { toast } from "react-toastify";

const HomePage = () => {
  return (
    <main>
      <button onClick={() => toast.success("Hello")}></button>
    </main>
  );
};

export default HomePage;
