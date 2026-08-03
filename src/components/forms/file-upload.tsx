"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * File upload for the Part 9 estimate flow (photos, inspection
 * reports, documents). A real <input type="file"> does the work —
 * the drop zone is enhancement, so keyboard and mobile behavior
 * come free. Selected files are listed and removable; validation
 * messaging arrives through the surrounding <Field>.
 */
export function FileUpload({
  label = "Upload files",
  accept,
  multiple = true,
  maxFiles = 10,
  onFilesChange,
  className,
}: {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
  className?: string;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  const update = (next: File[]) => {
    const capped = next.slice(0, maxFiles);
    setFiles(capped);
    onFilesChange?.(capped);
  };

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    update([...files, ...Array.from(incoming)]);
  };

  return (
    <div className={className}>
      <label
        htmlFor={id}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          addFiles(event.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-card border border-dashed px-6 py-10 text-center transition-colors",
          dragging
            ? "border-gold-600 bg-gold-500/10"
            : "border-tan-400 bg-cream-50 hover:border-gold-600",
        )}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 text-gold-600" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 16V4m0 0 4 4m-4-4-4 4" />
          <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
        </svg>
        <span className="font-nav text-sm font-medium text-ink-900">{label}</span>
        <span className="text-xs text-charcoal-500">
          Drag and drop, or press Enter to browse
          {accept ? ` · ${accept}` : ""}
        </span>
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(event) => addFiles(event.target.files)}
        />
      </label>

      {files.length > 0 ? (
        <ul className="mt-3 flex flex-col gap-2" aria-label="Selected files">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-4 rounded-field bg-tan-200/60 px-4 py-2.5 text-sm"
            >
              <span className="truncate text-ink-900">{file.name}</span>
              <button
                type="button"
                onClick={() => update(files.filter((_, i) => i !== index))}
                className="shrink-0 font-nav text-xs font-medium tracking-nav text-charcoal-600 uppercase hover:text-error-600"
              >
                Remove
                <span className="sr-only"> {file.name}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
