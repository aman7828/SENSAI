"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // Dynamically import html2pdf only in the browser
      const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default;

      const element = document.getElementById("resume-pdf");
      if (!element) throw new Error("Resume element not found");

      // Small delay to ensure the DOM is rendered
      await new Promise((resolve) => setTimeout(resolve, 50));

      const opt = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async () => {
    try {
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="space-y-6 p-4 bg-gradient-to-b from-lime-50 via-olive-50 to-emerald-50 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent 
                       bg-gradient-to-r from-lime-600 via-olive-600 to-emerald-700
                       drop-shadow-[2px_2px_4px_rgba(0,0,0,0.6)]">
          Resume Builder
        </h1>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="destructive"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </Button>
          <Button
            onClick={generatePDF}
            disabled={isGenerating}
            className="bg-lime-600 text-white hover:bg-lime-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/90 shadow rounded-lg p-1">
          <TabsTrigger value="edit" className="text-[#1b3c2e] hover:bg-lime-100">
            Form
          </TabsTrigger>
          <TabsTrigger value="preview" className="text-[#1b3c2e] hover:bg-lime-100">
            Markdown
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <form className="space-y-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#1b3c2e]">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-white shadow-sm">
                {["email","mobile","linkedin","twitter"].map((field,key)=>{
                  const label=field==="email"?"Email":field==="mobile"?"Mobile Number":field==="linkedin"?"LinkedIn URL":"Twitter/X Profile";
                  return (
                    <div className="space-y-2" key={key}>
                      <label className="text-sm font-medium text-[#1b3c2e]">{label}</label>
                      <Input {...register(`contactInfo.${field}`)} className="text-[#1b3c2e]"/>
                      {errors.contactInfo?.[field] && <p className="text-sm text-red-500">{errors.contactInfo[field]?.message}</p>}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#1b3c2e]">Professional Summary</h3>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} className="h-32 text-[#1b3c2e]" placeholder="Write a compelling professional summary..." />
                )}
              />
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#1b3c2e]">Skills</h3>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} className="h-32 text-[#1b3c2e]" placeholder="List your key skills..." />
                )}
              />
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#1b3c2e]">Work Experience</h3>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => <EntryForm type="Experience" entries={field.value} onChange={field.onChange} />}
              />
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#1b3c2e]">Education</h3>
              <Controller
                name="education"
                control={control}
                render={({ field }) => <EntryForm type="Education" entries={field.value} onChange={field.onChange} />}
              />
            </div>

            {/* Projects */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#1b3c2e]">Projects</h3>
              <Controller
                name="projects"
                control={control}
                render={({ field }) => <EntryForm type="Project" entries={field.value} onChange={field.onChange} />}
              />
            </div>
          </form>
        </TabsContent>

        {/* Preview */}
        <TabsContent value="preview">
          <Button
            variant="link"
            type="button"
            className="mb-2"
            onClick={() =>
              setResumeMode(resumeMode === "preview" ? "edit" : "preview")
            }
          >
            {resumeMode === "preview" ? (
              <>
                <Edit className="h-4 w-4 mr-1" />
                Edit Resume
              </>
            ) : (
              <>
                <Monitor className="h-4 w-4 mr-1" />
                Show Preview
              </>
            )}
          </Button>

          <div className="rounded-lg shadow-lg overflow-hidden">
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
              className="rounded-lg"
              style={{
                background: "linear-gradient(to bottom, #d9f99d, #4ade80, #10b981)",
                color: "#1b3c2e",
                padding: "1rem",
                borderRadius: "1rem",
              }}
              textareaProps={{
                style: {
                  background: "transparent",
                  color: "#1b3c2e",
                },
              }}
            />
          </div>

          {/* Offscreen PDF rendering */}
          <div style={{ position: "absolute", left: "-9999px", top: 0 }} id="resume-pdf">
            <MDEditor.Markdown
              source={previewContent}
              style={{
                background: "#f0fdf4",
                color: "#1b3c2e",
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

