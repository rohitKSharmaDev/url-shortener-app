import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { UrlState } from "@/Context";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import { useRef, useState } from "react";
import * as yup from 'yup';
import { useFetch } from "@/hooks/UseFetch";
import { QRCode } from "react-qrcode-logo";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();

  const ref = useRef();

  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    })
  };

  // useFetch()

  return (
    <>
      <Dialog defaultOpen={longLink} onOpenChange={(res) => {
        if(!res) {
          setSearchParams({});
        }
      }}>
        <DialogTrigger asChild>
          <Button variant="destructive">Create New Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
          </DialogHeader>

          {
            formValues?.longUrl && <QRCode value={formValues?.longUrl} size={250} ref={ref} />
          }

          <Input id="title" placeholder="Short Link's Title" value={formValues.title} onChange={handleChange} />
          <Error message={"some error"} />

          <Input id="longUrl" placeholder="Enter your Loooong URL" value={formValues.longUrl} onChange={handleChange} />
          <Error message={"some error"} />
          
          <div className="flex items-center gap-2">
            <Card className="p-2">trimmer.in</Card> /
            <Input id="customUrl" placeholder="Custom link(optional)" value={formValues.customUrl} onChange={handleChange} />
          </div>
          <Error message={"some error"} />

          <DialogFooter className="sm:justify-start">
            <Button variant="destructive">Save changes</Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateLink;