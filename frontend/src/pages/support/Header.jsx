import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Header() {
  return (
    <div>
      <div className="bg-accent">
        <Container className={"py-10 space-y-5"}>
          <h1 className="font-serif text-4xl font-bold">
            Suppport Philippine Coleopterist Society
          </h1>
          <div>
            {/* <Button>Become a Member</Button>
           <Button className={"bg-accent-orange"}>Volunteer</Button>
            <Button>Donate</Button>
            <Button>Merchandise</Button> */}
          </div>
        </Container>
      </div>
      <Container className="py-10 md:py-20 flex flex-wrap gap-10">
        {/* Membership */}
        <div className="space-y-3 flex-1 min-w-[280px]">
          <h2 className="font-serif text-3xl font-bold">Join our Community</h2>
          <p className="break-normal max-w-prose">
            Join our community by becoming a member of PCSI. To register, click{" "}
            <a href="#" className="font-bold hover:underline">
              here
            </a>
            .
          </p>
          {/* <Button>Join Now</Button> */}
        </div>

        {/* Volunteer */}
        <div className="space-y-3 flex-1 min-w-[280px]">
          <h2 className="font-serif text-3xl font-bold">Be a Volunteer</h2>
          <p className="break-normal max-w-prose">
            Volunteer at the Tropical Genomics and Invertebrate Research
            (TROGENIR) Laboratory or with our partner organizations and ongoing
            projects.
          </p>
          <Button className="bg-accent-orange hover:bg-accent-orange/80">
            Sign in as Volunteer
          </Button>
        </div>

        {/* Donate */}
        <div className="space-y-3 md:flex-none min-w-[280px]">
          <h2 className="font-serif text-3xl font-bold">
            Support through Donations
          </h2>
          <p className="break-normal max-w-prose">
            If you wish to be part of conserving our beetle species, you can
            help through donations. For more details on how to donate, please
            contact us at pcsi@gmail.com
          </p>
          <p>Every contribution counts.</p>
          <p>
            {" "}
            For donations, contact us at{" "}
            <a className="font-bold">pcsi@gmail.com</a>
          </p>

          <Button>Donate</Button>
        </div>
      </Container>
    </div>
  );
}
