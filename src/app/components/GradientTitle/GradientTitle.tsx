import styles from "./GradientTitle.module.css";

type Props = {
  children: string;
  colors: [string, string];
};

export function GradientTitle({ children, colors }: Props) {
  const [firstColor, secondColor] = colors;

  const cssColors = {
    "--first-color": firstColor,
    "--second-color": secondColor
  } as React.CSSProperties;

  return (
    <span className={styles.gradientTitle} style={cssColors}>
      {children}
    </span>
  );
}
