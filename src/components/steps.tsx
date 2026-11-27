export function Steps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="flex gap-4 rounded-2xl border border-line bg-surface p-6"
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-700 font-serif text-lg font-semibold text-white"
          >
            {index + 1}
          </span>
          <div>
            <h3 className="text-xl">
              <span className="sr-only">Stap {index + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
