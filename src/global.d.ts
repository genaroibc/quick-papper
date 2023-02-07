// 🙈 🙈
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          alt: string;
          "auto-rotate": boolean;
          "camera-controls": boolean;
          ar: boolean;
          "ios-src": string;
          poster: string;
        },
        HTMLElement
      >;
      "wc-toast": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export {};
