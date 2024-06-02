declare module NodeJS {
  interface Module {
    hot?: {
      accept(path?: string, callback?: () => void): void;
    };
  }
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}