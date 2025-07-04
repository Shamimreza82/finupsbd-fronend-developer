import { Bell, HelpCircle, HelpCircleIcon, Languages, PanelRightInactiveIcon, Settings2, SquareTerminal, TerminalSquare, User2 } from "lucide-react";

export const navList = {
    navMain: [
        {
            title: "Account Settings",
            url: "/user/setting",
            icon: Settings2,
            items: [
                {
                    title: "Change Password",
                    url: "/user/setting/update-password",
                },
                {
                    title: "Update Email/Mobile",
                    url: "/user/setting/update-email-mobile",
                },
            ],
        },
    ],
    profile: [
        {
            name: "Personal Informations",
            url: "/user/profile",
            icon: User2,
        }
    ],

    myItems: [
        {
            title: "My Loans",
            url: "#",
            icon: SquareTerminal,
            isActive: false,
            items: [
                {
                    title: "Loan Application",
                    url: "/user/loan-application",
                },
                {
                    title: "My Application",
                    url: "/user/my-application/my-application-loan",
                },
                {
                    title: "Application Status",
                    url: "/user/my-application/application-status",
                },
            ],
        },
        {
            title: "My Cards",
            url: "#",
            icon: SquareTerminal,
            isActive: false,
            items: [
                {
                    title: "Loan Application",
                    url: "/user/loan-application",
                },
            ],
        },
        {
            title: "My Insurance",
            url: "#",
            icon: SquareTerminal,
            isActive: false,
            items: [
                {
                    title: "Loan Application",
                    url: "/user/loan-application",
                },

            ],
        },
        // {
        //     name: "Favourite",
        //     url: "#",
        //     icon: HelpCircleIcon,
        // },

    ],
    settings: [
        {
            name: "Push Notification",
            url: "#",
            icon: Bell,
        },
        {
            name: "Language",
            url: "#",
            icon: Languages,
        },
    ],

    others: [
        {
            name: "Support",
            url: "#",
            icon: HelpCircleIcon,
        },
        {
            name: "Frequently Asked Qustions",
            url: "#",
            icon: HelpCircle,
        },
        {
            name: "Terms & Conditions",
            url: "#",
            icon: TerminalSquare,
        },
        {
            name: "Privacy Policy",
            url: "#",
            icon: PanelRightInactiveIcon,
        },
    ],
};
