import AuthForm from "../../components/AuthForm/AuthForm";
interface HomePageProps {
  loggedIn: boolean;
}

const HomePage = ({ loggedIn }: HomePageProps) => {
  return (
    <div>
      <p>Logged In: {String(loggedIn)}</p>
      <AuthForm />
    </div>
  );
}

export default HomePage;
