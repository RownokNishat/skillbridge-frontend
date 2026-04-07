import TutorExploreClient from "@/components/modules/tutors/TutorExploreClient";

export default function StudentTutorsPage() {
  return (
    <TutorExploreClient
      detailsBasePath="/student/tutors"
      title="Explore Tutors"
      description="Use search, filters, and sorting to find the best tutor for your learning goals."
    />
  );
}
