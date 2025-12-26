import FeatureSection from "../../component/home/Features";

export default function FeatureContainer() {
  return (
    <>
      <FeatureSection
        title="AI-Powered Requirement Mapping"
        subtitle="Instantly extract and rank job requirements by priority. We turn dense descriptions into a clear checklist for success."
        reverse={false}
        highlight={["AI-Powered"]}
      />

      <FeatureSection
        title="Make Your Resume ATS-Visible"
        subtitle="Our AI scans your resume against the job description to reveal your ATS score. Uncover missing points and optimize your profile for maximum impact."
        reverse={true}
        highlight={["ATS-Visible"]}
      />
    </>
  );
}
