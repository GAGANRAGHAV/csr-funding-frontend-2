"use client"

/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/S5px6w6CnkX
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Archivo } from 'next/font/google'

archivo({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Card } from "@/components/ui/card"
import Link from "next/link"

import axios from "axios";
import { useParams } from "next/navigation"; // Use this hook for accessing params
import { useState, useEffect } from "react";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
interface Project {
    name: string;
    description: string;
    image: string;
    moneyAllocated: string;
    // Add other fields you expect in the project object
  }


export default function indi() {

    const { id } = useParams(); // Use useParams to get the 'id' from the URL
    const [project, setProject] = useState<Project | null>(null);


  useEffect(() => {
    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getprojectbyid/${id}`
      );
      setProject(response.data.project);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  const itemName = project.name;
  const itemPrice = 100;



const checkout = async () => {
    try {
        const response = await axios.post(
            'http://localhost:5000/api/checkout',
            {
                items: [
                    {
                        id: 1,
                        quantity: 1,
                        price: itemPrice,
                        name: itemName
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, // Use this if your API requires cookies or other credentials
            }
        );

        const { url } = response.data;
        window.location.href = url;

    } catch (err) {
        console.error("Error during checkout:", err);
    }
};


  return (
    <div className="flex flex-col min-h-dvh">
      <section className="w-full pt-12 md:pt-24 lg:pt-32 border-b">
        <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                {project.name}
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {project.description}
              </p>
            </div>
            <img
              src={project.image}
              width="550"
              height="550"
              alt="Project Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 grid gap-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 bg-muted rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                  <CurrencyIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Money Allocated</h3>
                  <p className="text-muted-foreground">{project.moneyAllocated}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-muted rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                  <CurrencyIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Money Required</h3>
                  <p className="text-muted-foreground">Rs 500,000</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-muted rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                  <BuildingIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">NGO</h3>
                  <p className="text-muted-foreground">Acme Disaster Relief</p>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About the Project</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The recent floods in the region have devastated many communities, leaving thousands of families without
              safe and secure housing. This project aims to provide 100 families with new homes, built to withstand
              future natural disasters. The funds will be used to purchase building materials, hire local labor, and
              ensure the homes meet safety standards.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Donate Now
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Help Rebuild Homes for Flood Victims</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Your donation will make a real difference in the lives of families who have lost everything. Every
                contribution, no matter how small, will help us reach our goal and provide safe, secure housing.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {/* <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Donate $50
              </Link> */}
              <Button
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                onClick={checkout}
              >
                Donate $100
              </Button>
              {/* <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Donate Other Amount
              </Link> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function BuildingIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}


function CurrencyIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <line x1="3" x2="6" y1="3" y2="6" />
      <line x1="21" x2="18" y1="3" y2="6" />
      <line x1="3" x2="6" y1="21" y2="18" />
      <line x1="21" x2="18" y1="21" y2="18" />
    </svg>
  )
}
