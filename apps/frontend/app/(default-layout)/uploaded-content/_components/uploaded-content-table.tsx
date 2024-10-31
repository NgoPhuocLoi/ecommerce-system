import { DataTable } from "@repo/ui/components/ui/data-table/index";
import { getPreviewUploadedImages } from "app/actions/uploaded-content";
import { columns } from "./uploaded-content-column";

const UploadedContentTable = async () => {
  const uploadedContents = (await getPreviewUploadedImages()).metadata;
  return (
    <div>
      <DataTable columns={columns} data={uploadedContents} />
    </div>
  );
};

export default UploadedContentTable;
