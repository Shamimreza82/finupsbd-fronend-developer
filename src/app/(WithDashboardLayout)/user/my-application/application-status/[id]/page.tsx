import { notFound } from "next/navigation"






const ApplicationStatusPage = async (props: { params: Promise<{ id: string }> }) => {
    const { id } = await props.params

    // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/super-admin/get-single-application/${id}`, {
    //     cache: 'no-store',
    // })

    // const json = await res.json()

    // if (!json.success) {
    //     notFound()
    // }

    return (
        <div>
            <h1>Application Status: {id}</h1>
        </div>
    )
}

export default ApplicationStatusPage