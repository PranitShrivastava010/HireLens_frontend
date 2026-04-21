import React, { useCallback } from "react";
import ResumeBuilder from "../../component/resume builder/ResumeBuilder";
import { useGetResumePreviewQuery, useSaveResumeBasicsMutation } from "../../features/resume/resumeApi";

export default function ResumeBuilderContainer() {

  const {
    data: resume,
    isLoading,
    isFetching
  } = useGetResumePreviewQuery();

  const [saveBasics, { isLoading: isSaving }] = useSaveResumeBasicsMutation();

  const handleSaveBasics = useCallback(
    async (basicsData) => {
      await saveBasics(basicsData).unwrap();
    },
    [saveBasics]
  )

  if (isLoading) return <div>Loading...</div>;
  return(
    <ResumeBuilder resume={resume} loading={isFetching || isSaving} onSaveBasics={handleSaveBasics}/>
  )
}
