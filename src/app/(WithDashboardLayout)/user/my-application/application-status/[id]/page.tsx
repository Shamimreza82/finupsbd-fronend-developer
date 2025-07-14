import { notFound } from "next/navigation"






const ApplicationStatusPage = async (props: { params: Promise<{ id: string }> }) => {
    const { id } = await props.params

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/super-admin/get-single-application/${id}`)
    const data = await res.json()

    console.log(data)


    return (
        <div>
            <h1>Application Status: </h1>
        </div>
    )
}

export default ApplicationStatusPage