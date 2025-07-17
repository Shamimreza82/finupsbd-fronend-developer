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




// 'use client';

// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { CheckCircle2, Circle, Clock3 } from 'lucide-react';

// type Step = {
//   label: string;
//   date: string;
//   completed: boolean;
//   active?: boolean;
// };

// type LoanDetailsProps = {
//   loanAmount: number;
//   applicationId: string;
//   tenure: number;
//   applyDate: string;
//   interestRate: string;
//   emiAmount: number;
//   status: string;
//   steps: Step[];
// };

// export default function LoanDetails({
//   loanAmount,
//   applicationId,
//   tenure,
//   applyDate,
//   interestRate,
//   emiAmount,
//   status,
//   steps,
// }: LoanDetailsProps) {
//   return (
//     <Card className="w-full max-w-5xl mx-auto p-6 rounded-xl shadow-md bg-white">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Left Side: Loan Details */}
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h2>
//           <div className="space-y-1">
//             <p className="text-sm text-gray-500">Loan Amount</p>
//             <p className="text-2xl font-bold text-green-600">BDT {loanAmount?.toLocaleString()}</p>
//           </div>

//           <div className="mt-4 flex items-center gap-2">
//             <img src="/logo.png" alt="Finups BD" className="h-5 w-5" />
//             <span className="text-sm font-medium text-gray-900">Finups BD</span>
//           </div>

//           <p className="text-sm text-gray-700 font-semibold mt-1">Instant Loan</p>
//           <Badge className="mt-2 bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full w-fit">
//             {status}
//           </Badge>

//           <div className="mt-4 space-y-1 text-sm text-gray-700">
//             <p>
//               <span className="font-medium">Application ID:</span>{' '}
//               <span className="text-green-600 font-semibold">{applicationId}</span>
//             </p>
//             <p>
//               <span className="font-medium">Tenure:</span>{' '}
//               <span className="text-green-600 font-semibold">{tenure} Months</span>
//             </p>
//             <p>
//               <span className="font-medium">Apply on:</span>{' '}
//               <span className="text-green-600 font-semibold">{applyDate}</span>
//             </p>
//             <p>
//               <span className="font-medium">Interest rate:</span>{' '}
//               <span className="text-green-600 font-semibold">{interestRate}</span>
//             </p>
//             <p>
//               <span className="font-medium">EMI Amount:</span>{' '}
//               <span className="text-green-600 font-semibold">{emiAmount?.toLocaleString()}</span>
//             </p>
//           </div>
//         </div>

//         {/* Right Side: Application Status */}
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h2>
//           <ol className="relative border-l border-gray-300 space-y-6">
//             {steps?.map((step, index) => (
//               <li key={index} className="ml-4">
//                 <div className="flex items-start gap-3">
//                   <span className="mt-1">
//                     {step.completed ? (
//                       <CheckCircle2 className="h-5 w-5 text-green-600" />
//                     ) : step.active ? (
//                       <Clock3 className="h-5 w-5 text-green-500" />
//                     ) : (
//                       <Circle className="h-5 w-5 text-gray-300" />
//                     )}
//                   </span>
//                   <div>
//                     <p className="font-medium text-sm text-gray-800">{step.label}</p>
//                     <p className="text-xs text-gray-500">{step.date}</p>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ol>
//         </div>
//       </div>
//     </Card>
//   );
// }
