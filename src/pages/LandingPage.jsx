import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState('');
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();

    if(longUrl) {
      navigate(`/auth?createNew=${longUrl}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL Shotener you'll ever need!
      </h2>
      <form onSubmit={handleShorten} className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
        <Input 
          type="url"
          value={longUrl}
          placeholder="Enter your looong URL" 
          className="h-full py-4 px-4" 
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button 
          className="h-full" 
          type="submit" 
          variant="destructive">
          Shorten
        </Button>
      </form>
      <img src="/banner.webp" alt="Banner of Trimmer URL Shortener App" className="w-full my-11 md:px-11" />

      <Accordion type="multiple" collapsible className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>How does the Trimmr URL shortener works?</AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter version of that URL. This shortened URL redirects to the original long URL when accessed.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </div>
  );
};

export default LandingPage;