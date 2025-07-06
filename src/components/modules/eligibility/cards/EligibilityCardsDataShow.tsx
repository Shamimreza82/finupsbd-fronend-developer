"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface FeaturesCreditCard {
    id: string
    features1: string
    features2: string
    features3: string
    features4: string
    features5: string
    creditCardId: string
}

interface EligibilityCreditCard {
    id: string
    condition: string
    offer: string
    minimumIncome: number
    minimumExperience: number
    ageRequirement: number
    creditCardId: string
}

interface FeesChargesCreditCard {
    id: string
    annualFee: string
    annualFeeWaived: string
    latePaymentFee: string
    interestRate: string
    balanceTransferRate: string
    creditCardId: string
}

export interface CreditCard {
    id: string
    bankName: string
    interestPerDay: string
    freeAnnualFee: string
    regularAnnualFee: string
    interestFreePeriod: string
    latePaymentFees: string
    currency: string
    cardFeaturesType: string
    cardNetwork: string
    annualFeeWaivedReward: string
    freeSupplementaryCards: string
    maxSupplementaryCards: string
    balanceTransferAvailability: string
    ownBankATMFee: string
    otherBankATMFee: string
    loungeFacility: string
    loungeVisit: string
    cardChequeProcessingFee: string
    processingFeeMinimum: string
    cashWithdrawalLimit: string
    cardType: string
    isActive: boolean
    coverImage: string
    createdAt: string
    updatedAt: string
    userId: string | null
    featuresCreditCard: FeaturesCreditCard
    eligibilityCreditCard: EligibilityCreditCard
    feesChargesCreditCard: FeesChargesCreditCard
}

// Mock data based on your structure - replace with actual API call

export type FiltersType = {
    currency: string[];
    network: string[];
    type: string[];
};


type EligibilityCardDataShowProps = {
    handleQueryDataBody: (filters: FiltersType) => void;
    submissionData: CreditCard[]
}



export default function EligibilityCardDataShow({ handleQueryDataBody, submissionData }: EligibilityCardDataShowProps) {
    const [creditCards, setCreditCards] = useState<CreditCard[]>([])
    const [selectedCards, setSelectedCards] = useState<string[]>([])
    const [showComparison, setShowComparison] = useState(false)
    const [sortBy, setSortBy] = useState("Lowest Interest Rate")
    const [filters, setFilters] = useState({
        currency: [] as string[],
        network: [] as string[],
        type: [] as string[],
    })
    const [expandedCards, setExpandedCards] = useState<string[]>([])

    const router = useRouter()

    // Load data on component mount

    useEffect(() => {
        handleQueryDataBody(filters)
    }, [filters, handleQueryDataBody])


    useEffect(() => {
        // Replace this with your actual API call
        setCreditCards(submissionData)
    }, [submissionData])


    const handleCardSelection = (cardId: string) => {
        setSelectedCards((prev) => {
            if (prev.includes(cardId)) {
                return prev.filter((id) => id !== cardId)
            } else if (prev.length < 4) {
                return [...prev, cardId]
            }
            return prev
        })
    }

    const handleCompare = () => {
        if (selectedCards.length >= 2) {
            setShowComparison(true)
        }
    }

    const toggleCardExpansion = (cardId: string) => {
        setExpandedCards((prev) => (prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]))
    }

    const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: prev[filterType].includes(value)
                ? prev[filterType].filter((item) => item !== value)
                : [...prev[filterType], value],
        }))
    }

    const filteredCards = creditCards.filter((card) => {
        if (filters.network.length > 0 && !filters.network.includes(card.cardNetwork)) return false
        if (filters.type.length > 0 && !filters.type.includes(card.cardFeaturesType)) return false
        if (filters.currency.length > 0 && !filters.currency.includes(card.currency)) return false
        return card.isActive
    })

    const selectedCardDetails = creditCards.filter((card) => selectedCards.includes(card.id))

    const getCardFeatures = (card: CreditCard): string[] => {
        const features = card.featuresCreditCard
        return [features.features1, features.features2, features.features3, features.features4, features.features5].filter(
            Boolean,
        )
    }


    const handelApplication = (data: CreditCard) => {
        console.log(data);
        const loanRequest = {
            bankName: data?.bankName,
            bankImage: data?.coverImage,
        };
        localStorage.setItem("loanRequest", JSON.stringify(loanRequest));
        router.push(`/user/loan-application`);
    };



    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Home</span>
                        <span>/</span>
                        <span className="text-gray-900">Credit Card</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="flex gap-6">
                    {/* Sidebar Filters */}
                    <div className="w-64 space-y-6">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-sm font-medium">Filter</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs text-blue-600"
                                        onClick={() => setFilters({ currency: [], network: [], type: [] })}
                                    >
                                        Reset
                                    </Button>
                                </div>

                                {/* Currency Filter */}
                                <div className="mb-6">
                                    <h3 className="font-medium mb-3">Currency</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2">
                                            <Checkbox
                                                checked={filters.currency.includes("LOCAL")}
                                                onCheckedChange={() => handleFilterChange("currency", "LOCAL")}
                                            />
                                            <span className="text-sm">Local</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <Checkbox
                                                checked={filters.currency.includes("DUAL")}
                                                onCheckedChange={() => handleFilterChange("currency", "DUAL")}
                                            />
                                            <span className="text-sm">Dual</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Card Network Filter */}
                                <div className="mb-6">
                                    <h3 className="font-medium mb-3">Card Network</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2">
                                            <Checkbox
                                                checked={filters.network.includes("VISA")}
                                                onCheckedChange={() => handleFilterChange("network", "VISA")}
                                            />
                                            <span className="text-sm">Visa</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <Checkbox
                                                checked={filters.network.includes("MASTERCARD")}
                                                onCheckedChange={() => handleFilterChange("network", "MASTERCARD")}
                                            />
                                            <span className="text-sm">Mastercard</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Card Type Filter */}
                                <div>
                                    <h3 className="font-medium mb-3">Card Type</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2">
                                            <Checkbox
                                                checked={filters.type.includes("PLATINUM")}
                                                onCheckedChange={() => handleFilterChange("type", "PLATINUM")}
                                            />
                                            <span className="text-sm">Platinum</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <Checkbox
                                                checked={filters.type.includes("GOLD")}
                                                onCheckedChange={() => handleFilterChange("type", "GOLD")}
                                            />
                                            <span className="text-sm">Gold</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <Checkbox
                                                checked={filters.type.includes("SILVER")}
                                                onCheckedChange={() => handleFilterChange("type", "SILVER")}
                                            />
                                            <span className="text-sm">Silver</span>
                                        </label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Sort Options */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex gap-4 text-sm">
                                {["Lowest Interest Rate", "Highest Interest Rate", "Lowest Annual Fee", "Highest Annual Fee"].map(
                                    (option) => (
                                        <button
                                            key={option}
                                            onClick={() => setSortBy(option)}
                                            className={`px-3 py-1 rounded ${sortBy === option
                                                ? "bg-green-100 text-green-700 border border-green-300"
                                                : "text-gray-600 hover:text-gray-900"
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <span className="text-sm text-gray-600">We found {filteredCards.length} Credit Cards</span>
                        </div>

                        {/* Compare Button */}
                        {selectedCards.length >= 2 && (
                            <div className="fixed bottom-6 right-6 z-50">
                                <Button
                                    onClick={handleCompare}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg"
                                >
                                    Compare ({selectedCards.length})
                                </Button>
                            </div>
                        )}

                        {/* Card List */}
                        <div className="space-y-4">
                            {filteredCards.map((card) => (
                                <Card key={card.id} className="overflow-hidden">
                                    <CardContent className="p-0">
                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex gap-4">
                                                    <div className="w-24 h-16 bg-gray-100 rounded flex items-center justify-center">
                                                        <Image
                                                            height={200}
                                                            width={200}
                                                            src={card.coverImage || "/placeholder.svg"}
                                                            alt={`${card.bankName} ${card.cardFeaturesType}`}
                                                            className="max-w-full max-h-full object-contain"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                                                100% Paperless Application
                                                            </Badge>
                                                            {card.cardFeaturesType === "PLATINUM" && (
                                                                <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                                                                    Premium
                                                                </Badge>
                                                            )}
                                                            <Button variant="ghost" size="sm">
                                                                <Heart className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                        <h3 className="font-semibold text-lg mb-2">
                                                            {card.bankName} {card.cardFeaturesType} {card.cardNetwork}
                                                        </h3>
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <span className="text-gray-600">Annual fee:</span> {card.regularAnnualFee}
                                                            </div>
                                                            <div>
                                                                <span className="text-gray-600">Interest Rate:</span>{" "}
                                                                {card.feesChargesCreditCard.interestRate}
                                                            </div>
                                                            <div>
                                                                <span className="text-gray-600">Interest Free Period:</span> {card.interestFreePeriod}
                                                            </div>
                                                            <div>
                                                                <span className="text-gray-600">Cash Withdrawal Limit:</span> {card.cashWithdrawalLimit}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-3">
                                                    <Button
                                                        onClick={() => handelApplication(card)}
                                                        className="w-full bg-primary hover:bg-primary/90"
                                                    >
                                                        Apply Now
                                                    </Button>
                                                    <label className="flex items-center gap-2">
                                                        <Checkbox
                                                            checked={selectedCards.includes(card.id)}
                                                            onCheckedChange={() => handleCardSelection(card.id)}
                                                            disabled={!selectedCards.includes(card.id) && selectedCards.length >= 4}
                                                        />
                                                        <span className="text-sm">Compare</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <Collapsible>
                                                <CollapsibleTrigger
                                                    className="flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700"
                                                    onClick={() => toggleCardExpansion(card.id)}
                                                >
                                                    <span className="text-sm font-medium">View Details</span>
                                                    {expandedCards.includes(card.id) ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )}
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="mt-4">
                                                    <div className="border-t pt-4">
                                                        <div className="flex gap-8 mb-4">
                                                            <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-2">
                                                                Features
                                                            </button>
                                                            <button className="text-sm text-gray-600 pb-2">Eligibility</button>
                                                            <button className="text-sm text-gray-600 pb-2">Fees & Charges</button>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {getCardFeatures(card).map((feature, index) => (
                                                                <div key={index} className="flex items-start gap-2">
                                                                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                                                    <span className="text-sm text-gray-700">{feature}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* <ComparisonCardData submissionData={submissionData}/>                     */}
            {/* Comparison Modal */}
            <Dialog open={showComparison} onOpenChange={setShowComparison}>
                <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="border-b pb-4">
                        <DialogTitle className="text-xl font-semibold text-center">
                            Choose your best suitable Credit card
                        </DialogTitle>
                    </DialogHeader>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            {/* Header Row */}
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-4 font-medium">Details / Bank Name</th>
                                    {selectedCardDetails.map((card) => (
                                        <th key={card.id} className="text-center p-4 min-w-[200px]">
                                            <div className="flex flex-col items-center gap-2">
                                                <Image
                                                    height={200}
                                                    width={200}
                                                    src={card.coverImage || "/placeholder.svg"}
                                                    alt={`${card.bankName} ${card.cardFeaturesType}`}
                                                    className="w-16 h-10 object-contain"
                                                />
                                                <div className="text-sm font-medium">{card.bankName}</div>
                                                <div className="text-xs text-gray-600">
                                                    {card.cardFeaturesType} {card.cardNetwork}
                                                </div>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {/* Annual Fee Section */}
                                <tr className="bg-green-600 text-white">
                                    <td colSpan={selectedCardDetails.length + 1} className="p-3 font-semibold">
                                        Annual Fee
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Pro Annual Fee</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.freeAnnualFee === "Yes" ? "1st Year Free" : "Not Available"}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Regular Annual Fee</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.regularAnnualFee}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Annual fee waived</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.feesChargesCreditCard.annualFeeWaived}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Annual fee waived Reward Point</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.annualFeeWaivedReward}
                                        </td>
                                    ))}
                                </tr>

                                {/* Interest Per Day Section */}
                                <tr className="bg-green-600 text-white">
                                    <td colSpan={selectedCardDetails.length + 1} className="p-3 font-semibold">
                                        Interest Per Day
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Interest Per Day</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.interestPerDay}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Interest free period</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.interestFreePeriod}
                                        </td>
                                    ))}
                                </tr>

                                {/* Supplementary Card Section */}
                                <tr className="bg-green-600 text-white">
                                    <td colSpan={selectedCardDetails.length + 1} className="p-3 font-semibold">
                                        Supplementary Card
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Free Supplementary Cards</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.freeSupplementaryCards} Cards
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Max Supplementary Cards</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.maxSupplementaryCards} Cards
                                        </td>
                                    ))}
                                </tr>

                                {/* Balance Transfer Section */}
                                <tr className="bg-green-600 text-white">
                                    <td colSpan={selectedCardDetails.length + 1} className="p-3 font-semibold">
                                        Balance Transfer
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Balance Transfer Availability</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.balanceTransferAvailability}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Own Bank ATM Fee</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.ownBankATMFee}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Other Bank ATM Fee</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.otherBankATMFee}
                                        </td>
                                    ))}
                                </tr>

                                {/* Travel Facilities (Local) Section */}
                                <tr className="bg-green-600 text-white">
                                    <td colSpan={selectedCardDetails.length + 1} className="p-3 font-semibold">
                                        Travel Facilities (Local)
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Lounge Facility</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.loungeFacility}
                                        </td>
                                    ))}
                                </tr>

                                {/* Travel Facilities (International) Section */}
                                <tr className="bg-green-600 text-white">
                                    <td colSpan={selectedCardDetails.length + 1} className="p-3 font-semibold">
                                        Travel Facilities (International)
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Lounge visit</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.loungeVisit}
                                        </td>
                                    ))}
                                </tr>

                                {/* Card Charges for Local Section */}
                                <tr className="bg-green-600 text-white">
                                    <td colSpan={selectedCardDetails.length + 1} className="p-3 font-semibold">
                                        Card Charges for Local
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Card Charges Processing Fee</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.cardChequeProcessingFee}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Processing Fee Minimum</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.processingFeeMinimum}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Cash Withdrawal Limit</td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.cashWithdrawalLimit}
                                        </td>
                                    ))}
                                </tr>

                                {/* Apply Now Buttons */}
                                <tr>
                                    <td className="p-4"></td>
                                    {selectedCardDetails.map((card) => (
                                        <td key={card.id} className="p-4 text-center">
                                            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
                                                Apply Now
                                            </Button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
