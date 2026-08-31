"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Trash2, Upload, X, Loader2 } from "lucide-react";
import type { FieldSchema, ObjectFields } from "@/lib/blocks/types";

type Props = {
  fields: ObjectFields;
  values: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
};

export function AutoForm({ fields, values, onChange }: Props) {
  function set(key: string, value: unknown) {
    onChange({ ...values, [key]: value });
  }

  return (
    <div className="grid gap-4">
      {Object.entries(fields).map(([key, schema]) => (
        <FieldEditor
          key={key}
          fieldKey={key}
          schema={schema}
          value={values[key]}
          onChange={(v) => set(key, v)}
        />
      ))}
    </div>
  );
}

function FieldEditor({
  fieldKey,
  schema,
  value,
  onChange
}: {
  fieldKey: string;
  schema: FieldSchema;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  switch (schema.kind) {
    case "text":
      return (
        <Field label={schema.label}>
          {schema.multiline ? (
            <Textarea
              value={typeof value === "string" ? value : ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={schema.placeholder}
              rows={3}
            />
          ) : (
            <Input
              value={typeof value === "string" ? value : ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={schema.placeholder}
            />
          )}
        </Field>
      );

    case "number":
      return (
        <Field label={schema.label}>
          <Input
            type="number"
            value={typeof value === "number" ? value : ""}
            min={schema.min}
            max={schema.max}
            onChange={(e) => onChange(e.target.valueAsNumber)}
          />
        </Field>
      );

    case "boolean":
      return (
        <Field label={schema.label} inline>
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
        </Field>
      );

    case "color":
      return (
        <Field label={schema.label}>
          <div className="flex gap-2">
            <input
              type="color"
              value={typeof value === "string" ? value : "#000000"}
              onChange={(e) => onChange(e.target.value)}
              className="h-9 w-10 cursor-pointer rounded border border-border bg-transparent p-0.5"
            />
            <Input
              value={typeof value === "string" ? value : ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#000000"
              className="flex-1 font-mono text-xs"
            />
          </div>
        </Field>
      );

    case "select":
      return (
        <Field label={schema.label}>
          <select
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="">— select —</option>
            {schema.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      );

    case "asset":
      return (
        <AssetField
          label={schema.label}
          value={typeof value === "string" ? value : ""}
          resourceType={schema.resourceType ?? "image"}
          onChange={onChange}
        />
      );

    case "array":
      return (
        <ArrayEditor
          label={schema.label}
          of={schema.of}
          itemLabel={schema.itemLabel}
          value={Array.isArray(value) ? value : []}
          onChange={onChange}
        />
      );

    case "object":
      return (
        <Field label={schema.label}>
          <div className="rounded-md border border-border/50 p-3">
            <AutoForm
              fields={schema.fields}
              values={(typeof value === "object" && value !== null ? value : {}) as Record<string, unknown>}
              onChange={onChange}
            />
          </div>
        </Field>
      );

    default:
      return null;
  }
}

function ArrayEditor({
  label,
  of: itemSchema,
  itemLabel,
  value,
  onChange
}: {
  label: string;
  of: FieldSchema | ObjectFields;
  itemLabel?: string;
  value: unknown[];
  onChange: (v: unknown) => void;
}) {
  function update(index: number, next: unknown) {
    const arr = [...value];
    arr[index] = next;
    onChange(arr);
  }

  function add() {
    const empty = isObjectFields(itemSchema)
      ? Object.fromEntries(Object.keys(itemSchema).map((k) => [k, ""]))
      : "";
    onChange([...value, empty]);
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function move(index: number, dir: -1 | 1) {
    const arr = [...value];
    const target = index + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    onChange(arr);
  }

  return (
    <Field label={label}>
      <div className="grid gap-2">
        {value.map((item, i) => (
          <div key={i} className="rounded-md border border-border/50 p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">
                {itemLabel ?? label} {i + 1}
              </span>
              <div className="flex gap-1">
                <button onClick={() => move(i, -1)} className="rounded p-0.5 hover:bg-white/10 disabled:opacity-30" disabled={i === 0} title="Move up">▲</button>
                <button onClick={() => move(i, 1)} className="rounded p-0.5 hover:bg-white/10 disabled:opacity-30" disabled={i === value.length - 1} title="Move down">▼</button>
                <button onClick={() => remove(i)} className="rounded p-0.5 text-red-400 hover:bg-red-400/10" title="Remove">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
            {isObjectFields(itemSchema) ? (
              <AutoForm
                fields={itemSchema}
                values={(typeof item === "object" && item !== null ? item : {}) as Record<string, unknown>}
                onChange={(next) => update(i, next)}
              />
            ) : (
              <FieldEditor
                fieldKey={`item-${i}`}
                schema={itemSchema as FieldSchema}
                value={item}
                onChange={(next) => update(i, next)}
              />
            )}
          </div>
        ))}
        <Button size="sm" variant="secondary" onClick={add} className="w-full">
          <Plus className="h-3.5 w-3.5" />
          Add {itemLabel ?? label}
        </Button>
      </div>
    </Field>
  );
}

function AssetField({
  label,
  value,
  resourceType,
  onChange
}: {
  label: string;
  value: string;
  resourceType: "image" | "video";
  onChange: (v: unknown) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/assets/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Upload failed");
      onChange(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Field label={label}>
      {/* Preview */}
      {value && resourceType === "image" && (
        <div className="relative mb-2 overflow-hidden rounded-md border border-border/50 bg-white/[0.03]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-36 w-full object-contain" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
            title="Remove image"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      {value && resourceType === "video" && (
        <div className="relative mb-2">
          <video src={value} controls className="h-36 w-full rounded-md object-contain" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
            title="Remove video"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Upload button */}
      <input
        ref={fileRef}
        type="file"
        accept={resourceType === "video" ? "video/*" : "image/*"}
        title={`Upload ${resourceType}`}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <Button
        type="button"
        size="sm"
        variant="secondary"
        className="w-full"
        disabled={uploading}
        onClick={() => fileRef.current?.click()}
      >
        {uploading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Upload className="h-3.5 w-3.5" />
        )}
        {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
      </Button>

      {/* URL fallback */}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…or paste a URL"
        className="mt-1 text-xs"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </Field>
  );
}

function Field({
  label,
  children,
  inline
}: {
  label: string;
  children: React.ReactNode;
  inline?: boolean;
}) {
  return (
    <div className={cn("grid gap-1.5", inline && "grid-cols-[1fr_auto] items-center")}>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

function isObjectFields(schema: FieldSchema | ObjectFields): schema is ObjectFields {
  return typeof schema === "object" && !("kind" in schema);
}
