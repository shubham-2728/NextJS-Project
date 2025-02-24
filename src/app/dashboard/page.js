// import FileUpload from "../../components/FileUpload";
// import UserDocuments from "../../components/UserDocuments";

import FileUpload from "@/components/FileUpload";
import UserDocuments from "@/components/UserDocuments";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <FileUpload />
      <UserDocuments />
    </div>
  );
}
