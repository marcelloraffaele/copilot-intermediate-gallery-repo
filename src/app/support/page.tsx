'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { Headphones, Mail, MessageSquareMore } from "lucide-react";
import { Hero, SectionContainer, SectionTitle } from "@/components/ui";

const supportCategories = [
  "Assistenza account",
  "Problema tecnico",
  "Gestione gallerie",
  "Fatturazione",
];

const initialFormData = {
  name: "",
  email: "",
  category: "",
  message: "",
};

const contactHighlights = [
  {
    icon: Headphones,
    title: "Supporto dedicato",
    description: "Raccogli tutte le richieste in un unico punto, con risposta rapida del team.",
  },
  {
    icon: MessageSquareMore,
    title: "Categorie chiare",
    description: "Indica subito il contesto della richiesta per ricevere assistenza più mirata.",
  },
  {
    icon: Mail,
    title: "Conferma via email",
    description: "Riceverai una conferma via email al termine dell'invio della richiesta.",
  },
];

type FormData = typeof initialFormData;
type FormField = keyof FormData;
type FormErrors = Partial<Record<FormField, string>>;
type SubmitStatus = "idle" | "loading" | "success" | "error";

function isValidEmail(email: string) {
  const emailField = document.createElement("input");
  emailField.type = "email";
  emailField.value = email;
  return emailField.validity.valid;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Inserisci il tuo nome.";
  }

  if (!data.email.trim()) {
    errors.email = "Inserisci il tuo indirizzo email.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Inserisci un indirizzo email valido.";
  }

  if (!data.category) {
    errors.category = "Seleziona una categoria.";
  }

  if (!data.message.trim()) {
    errors.message = "Inserisci un messaggio.";
  } else if (data.message.trim().length < 20) {
    errors.message = "Il messaggio deve contenere almeno 20 caratteri.";
  }

  return errors;
}

function mockSubmitSupportRequest(data: FormData) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const shouldFail =
        data.email.toLowerCase().includes("fail") ||
        data.message.toLowerCase().includes("errore di test");

      if (shouldFail) {
        reject(new Error("Mock support request failed"));
        return;
      }

      resolve();
    }, 1200);
  });
}

export default function SupportPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const fieldName = name as FormField;

    setFormData((currentData) => ({
      ...currentData,
      [fieldName]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[fieldName]) {
        return currentErrors;
      }

      const updatedErrors = { ...currentErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });

    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setStatusMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus("idle");
      setStatusMessage("");
      return;
    }

    setErrors({});
    setSubmitStatus("loading");
    setStatusMessage("Invio della richiesta in corso...");

    try {
      await mockSubmitSupportRequest(formData);
      setFormData(initialFormData);
      setSubmitStatus("success");
      setStatusMessage("Richiesta inviata con successo. Ti ricontatteremo al più presto.");
    } catch {
      setSubmitStatus("error");
      setStatusMessage(
        "Invio non riuscito. Verifica i dati inseriti e riprova, oppure contattaci direttamente via email."
      );
    }
  };

  const statusStyles =
    submitStatus === "success"
      ? "border-green-200 bg-green-50 text-green-800 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-200"
      : submitStatus === "error"
        ? "border-red-200 bg-red-50 text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
        : "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200";

  return (
    <div className="page-gradient">
      <Hero
        title="Richiedi Supporto"
        description="Contatta il team per assistenza su account, gallerie, aspetti tecnici o richieste amministrative."
      />

      <SectionContainer className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="card-base p-6">
            <SectionTitle title="Prima di inviare" className="!mb-6" />
            <div className="space-y-6">
              {contactHighlights.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="icon-container-blue shrink-0">
                    <Icon className="icon-blue h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-base p-6">
            <SectionTitle title="Invia la tua richiesta" className="!mb-6" />

            <form className="space-y-6" noValidate onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleFieldChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className="form-input"
                    placeholder="Il tuo nome"
                  />
                  {errors.name ? (
                    <p id="name-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFieldChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="form-input"
                    placeholder="nome@azienda.it"
                  />
                  {errors.email ? (
                    <p id="email-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Categoria richiesta
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleFieldChange}
                  aria-invalid={Boolean(errors.category)}
                  aria-describedby={errors.category ? "category-error" : undefined}
                  className="form-select"
                >
                  <option value="">Seleziona una categoria...</option>
                  {supportCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category ? (
                  <p id="category-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
                    {errors.category}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Messaggio
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleFieldChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-help message-error" : "message-help"}
                  className="form-input min-h-40 resize-y"
                  placeholder="Descrivi il problema o la richiesta di supporto."
                />
                <p id="message-help" className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Inserisci almeno 20 caratteri per aiutarci a gestire meglio la richiesta.
                </p>
                {errors.message ? (
                  <p id="message-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              {submitStatus !== "idle" ? (
                <div
                  aria-live="polite"
                  className={`rounded-lg border px-4 py-3 text-sm font-medium ${statusStyles}`}
                >
                  {statusMessage}
                </div>
              ) : null}

              <button type="submit" className="btn-primary w-full py-3" disabled={submitStatus === "loading"}>
                {submitStatus === "loading" ? "Invio in corso..." : "Invia richiesta"}
              </button>
            </form>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
