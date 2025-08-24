

import ArrangementLetter from "@/components/pdf/components/ArrangementLetter"
import DemandNoteFromApplication from "@/components/pdf/components/DemandNoteFromApplication";
import { getAgrementDoc } from "@/services/applications/userApplication";
import { TAgreementDoc } from "@/types/applications";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";


const DownloadAgrementCopy = async (props: { params: Promise<{ id: string }> }) => {
    const { id } = await props.params






    let appData: TAgreementDoc | null = null;



    try {
        const res = await getAgrementDoc(id);
        appData = res?.data as TAgreementDoc ?? null;
    } catch (err) {
        console.error("get agreement data faild failed:", err);
    }

    console.log(appData)
    if (!appData) {
        // 404 page
        notFound();
    }



    // const doc = <DemandNoteFromApplication applicationData={appData} />;

    return (
        <div>
            <ArrangementLetter applicationData={appData} />
            {/* <div style={{ height: "85vh" }}>
                <PDFViewer style={{ width: "100%", height: "100%" }}>
                    <DemandNoteFromApplication applicationData={appData} />
                </PDFViewer>
            </div> */}

        </div>
    )
}

export default DownloadAgrementCopy


