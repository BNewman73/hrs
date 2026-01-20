/**
 * Small UI hook to set the browser page title.
 *
 * Use this in page components to update the document title when the
 * component mounts or when the title changes.
 *
 * @param title - The title to set on the document.
 */
import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
