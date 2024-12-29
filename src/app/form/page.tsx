"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function projectform() {
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [moneyrequired, setMoneyRequired] = useState<number>(0);
  const [image, setImages] = useState("");
  const [location, setLocation] = useState(""); // New state for location
  const [ngo, setngo] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("ngoname");
    if (savedToken) {
      setngo(savedToken);
    }
  }, []);

  const router = useRouter();

  const handleCreate = async () => {
    try {
      const payload = {
        name,
        description,
        ngo,
        moneyrequired,
        image,
        location, // Include location in payload
      };
      console.log(payload);

      const response = await axios.post(
        "https://csr-funding-backend.onrender.com/api/createproject",
        payload
      );
      // router.push('/');
      console.log(payload);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setImages(result);
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a New Project</CardTitle>
        <CardDescription>
          Share details about your organization's latest initiative.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="Rebuild the community center"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Provide details about the project..."
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="123 Main St, Anytown USA"
                onChange={(e) => setLocation(e.target.value)} // Update location state
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="funding">Required Funding</Label>
              <Input
                id="funding"
                type="number"
                placeholder="50000"
                onChange={(e) =>
                  setMoneyRequired(parseFloat(e.target.value) || 0)
                }
              />{" "}
            </div>
            <div>
              <Label htmlFor="status">Project Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="fundraising">Fundraising</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="image">Project Image</Label>
              <Input id="image" type="file" onChange={handleImageUpload} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" onClick={handleCreate}>
          Post Project
        </Button>
      </CardFooter>
    </Card>
  );
}
