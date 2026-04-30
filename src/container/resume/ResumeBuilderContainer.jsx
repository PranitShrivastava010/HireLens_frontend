import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import ResumeBuilder from "../../component/resume builder/ResumeBuilder";
import {
  useCreateCertificationMutation,
  useCreateEducationMutation,
  useCreateExperienceMutation,
  useCreateProjectMutation,
  useCreateResumeMutation,
  useCreateSkillMutation,
  useDeleteCertificationMutation,
  useDeleteEducationMutation,
  useDeleteExperienceMutation,
  useDeleteProjectMutation,
  useDeleteSkillMutation,
  useGetResumeQuery,
  useUpdateCertificationMutation,
  useUpdateEducationMutation,
  useUpdateExperienceMutation,
  useUpdateProjectMutation,
  useUpdateResumeBasicsMutation,
  useUpdateResumeLayoutMutation,
  useUpdateSkillMutation,
} from "../../features/resume/resumeApi";

const emptyToNull = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
};

const normalizeStringArray = (values = []) =>
  values
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean);

const normalizeBasicsPayload = (payload) => ({
  fullName: payload.fullName?.trim() || "",
  headline: emptyToNull(payload.headline),
  summary: emptyToNull(payload.summary),
  email: emptyToNull(payload.email),
  phone: emptyToNull(payload.phone),
  location: emptyToNull(payload.location),
  linkedin: emptyToNull(payload.linkedin),
  github: emptyToNull(payload.github),
  customLinks:
    payload.customLinks
      ?.map((link) => ({
        label: link.label?.trim() || "",
        url: link.url?.trim() || "",
      }))
      .filter((link) => link.label && link.url) ?? [],
});

const normalizeExperiencePayload = (payload) => ({
  company: payload.company?.trim() || "",
  role: payload.role?.trim() || "",
  location: emptyToNull(payload.location),
  startDate: payload.startDate,
  endDate: payload.isCurrent ? null : emptyToNull(payload.endDate),
  isCurrent: Boolean(payload.isCurrent),
  bullets: normalizeStringArray(payload.bullets),
});

const normalizeEducationPayload = (payload) => ({
  institute: payload.institute?.trim() || "",
  degree: payload.degree?.trim() || "",
  field: emptyToNull(payload.field),
  startYear: Number(payload.startYear),
  endYear: payload.endYear ? Number(payload.endYear) : null,
});

const normalizeSkillPayload = (payload) => ({
  name: payload.name?.trim() || "",
  category: emptyToNull(payload.category),
  level: emptyToNull(payload.level),
});

const normalizeProjectPayload = (payload) => ({
  name: payload.name?.trim() || "",
  description: payload.description?.trim() || "",
  techStack: normalizeStringArray(payload.techStack),
  link: emptyToNull(payload.link),
  dateLabel: emptyToNull(payload.dateLabel),
});

const normalizeCertificationPayload = (payload) => ({
  name: payload.name?.trim() || "",
  issuer: payload.issuer?.trim() || "",
  year: payload.year ? Number(payload.year) : null,
  link: emptyToNull(payload.link),
});

export default function ResumeBuilderContainer() {
  const user = useSelector((state) => state.auth.user);
  const initAttemptedRef = useRef(false);

  const {
    data: resume,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetResumeQuery();

  const [createResume, { isLoading: isCreating }] = useCreateResumeMutation();
  const [updateBasics, { isLoading: isSavingBasics }] =
    useUpdateResumeBasicsMutation();
  const [updateLayoutSettings, { isLoading: isSavingLayout }] =
    useUpdateResumeLayoutMutation();
  const [createExperience, { isLoading: isCreatingExperience }] =
    useCreateExperienceMutation();
  const [updateExperience, { isLoading: isUpdatingExperience }] =
    useUpdateExperienceMutation();
  const [deleteExperience, { isLoading: isDeletingExperience }] =
    useDeleteExperienceMutation();
  const [createEducation, { isLoading: isCreatingEducation }] =
    useCreateEducationMutation();
  const [updateEducation, { isLoading: isUpdatingEducation }] =
    useUpdateEducationMutation();
  const [deleteEducation, { isLoading: isDeletingEducation }] =
    useDeleteEducationMutation();
  const [createSkill, { isLoading: isCreatingSkill }] =
    useCreateSkillMutation();
  const [updateSkill, { isLoading: isUpdatingSkill }] =
    useUpdateSkillMutation();
  const [deleteSkill, { isLoading: isDeletingSkill }] =
    useDeleteSkillMutation();
  const [createProject, { isLoading: isCreatingProject }] =
    useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdatingProject }] =
    useUpdateProjectMutation();
  const [deleteProject, { isLoading: isDeletingProject }] =
    useDeleteProjectMutation();
  const [createCertification, { isLoading: isCreatingCertification }] =
    useCreateCertificationMutation();
  const [updateCertification, { isLoading: isUpdatingCertification }] =
    useUpdateCertificationMutation();
  const [deleteCertification, { isLoading: isDeletingCertification }] =
    useDeleteCertificationMutation();

  const isMissingResume = error?.status === 404;

  useEffect(() => {
    if (!isMissingResume || initAttemptedRef.current) {
      return;
    }

    initAttemptedRef.current = true;
    const fullName = user?.name?.trim() || "Your Name";

    createResume({
      title: user?.name ? `${user.name}'s Resume` : "Untitled Resume",
      basics: {
        fullName,
        email: user.email ?? undefined,
      },
    })
      .unwrap()
      .then(() => refetch())
      .catch(() => {
        initAttemptedRef.current = false;
      });
  }, [createResume, isMissingResume, refetch, user]);

  const handlers = useMemo(
    () => ({
      saveBasics: async (payload) =>
        updateBasics(normalizeBasicsPayload(payload)).unwrap(),
      updateLayoutSettings: async (payload) =>
        updateLayoutSettings(payload).unwrap(),
      createExperience: async (payload) =>
        createExperience(normalizeExperiencePayload(payload)).unwrap(),
      updateExperience: async (experienceId, payload) =>
        updateExperience({
          experienceId,
          ...normalizeExperiencePayload(payload),
        }).unwrap(),
      deleteExperience: async (experienceId) =>
        deleteExperience(experienceId).unwrap(),
      createEducation: async (payload) =>
        createEducation(normalizeEducationPayload(payload)).unwrap(),
      updateEducation: async (educationId, payload) =>
        updateEducation({
          educationId,
          ...normalizeEducationPayload(payload),
        }).unwrap(),
      deleteEducation: async (educationId) =>
        deleteEducation(educationId).unwrap(),
      createSkill: async (payload) =>
        createSkill(normalizeSkillPayload(payload)).unwrap(),
      updateSkill: async (skillId, payload) =>
        updateSkill({
          skillId,
          ...normalizeSkillPayload(payload),
        }).unwrap(),
      deleteSkill: async (skillId) => deleteSkill(skillId).unwrap(),
      createProject: async (payload) =>
        createProject(normalizeProjectPayload(payload)).unwrap(),
      updateProject: async (projectId, payload) =>
        updateProject({
          projectId,
          ...normalizeProjectPayload(payload),
        }).unwrap(),
      deleteProject: async (projectId) => deleteProject(projectId).unwrap(),
      createCertification: async (payload) =>
        createCertification(normalizeCertificationPayload(payload)).unwrap(),
      updateCertification: async (certificationId, payload) =>
        updateCertification({
          certificationId,
          ...normalizeCertificationPayload(payload),
        }).unwrap(),
      deleteCertification: async (certificationId) =>
        deleteCertification(certificationId).unwrap(),
    }),
    [
      createCertification,
      createEducation,
      createExperience,
      createProject,
      createSkill,
      deleteCertification,
      deleteEducation,
      deleteExperience,
      deleteProject,
      deleteSkill,
      updateBasics,
      updateLayoutSettings,
      updateCertification,
      updateEducation,
      updateExperience,
      updateProject,
      updateSkill,
    ]
  );

  const isMutating =
    isCreating ||
    isSavingBasics ||
    isSavingLayout ||
    isCreatingExperience ||
    isUpdatingExperience ||
    isDeletingExperience ||
    isCreatingEducation ||
    isUpdatingEducation ||
    isDeletingEducation ||
    isCreatingSkill ||
    isUpdatingSkill ||
    isDeletingSkill ||
    isCreatingProject ||
    isUpdatingProject ||
    isDeletingProject ||
    isCreatingCertification ||
    isUpdatingCertification ||
    isDeletingCertification;

  if (isLoading || (isMissingResume && isCreating)) {
    return (
      <div className="resume-loading-state">
        Preparing your resume workspace...
      </div>
    );
  }

  if (!resume && error && !isMissingResume) {
    return (
      <div className="resume-error-state">
        <h2>Resume builder is unavailable right now.</h2>
        <p>Please refresh the page and try again.</p>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="resume-loading-state">
        Setting up your first resume...
      </div>
    );
  }

  return (
    <ResumeBuilder
      resume={resume}
      loading={isFetching || isMutating}
      handlers={handlers}
    />
  );
}
