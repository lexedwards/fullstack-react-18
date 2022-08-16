import { FilledContext } from 'react-helmet-async';

export function htmlTags(appContext?: Partial<FilledContext>) {
  return {
    head: `<!DOCTYPE html><html lang="en"><head>${appContext?.helmet?.title.toString()}${appContext?.helmet?.priority.toString()}${appContext?.helmet?.meta.toString()}${appContext?.helmet?.link.toString()}${appContext?.helmet?.script.toString()}<script defer src="app/main.js"></script></head><body>`,
    foot: `</body></html>`,
  };
}
