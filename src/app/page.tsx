import { BlogGenerator } from "./components/BlogGenerator/BlogGenerator";
import { Hero } from "./components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <svg
        style={{
          width: "100vw",
          position: "absolute",
          left: 0,
          transform: "translateY(-30%)"
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="var(--secondary-color)"
          fill-opacity="1"
          d="M0,128L60,149.3C120,171,240,213,360,202.7C480,192,600,128,720,106.7C840,85,960,107,1080,144C1200,181,1320,235,1380,261.3L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
      <svg
        style={{
          width: "100vw",
          position: "absolute",
          left: 0,
          transform: "translateY(70%)"
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="var(--secondary-color)"
          fill-opacity="1"
          d="M0,128L60,149.3C120,171,240,213,360,202.7C480,192,600,128,720,106.7C840,85,960,107,1080,144C1200,181,1320,235,1380,261.3L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
      <BlogGenerator />
    </>
  );
}
