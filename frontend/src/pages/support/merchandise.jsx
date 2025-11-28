import React, { useState } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { images } from "@/constants/images";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpDown,
  Box,
  BoxSelectIcon,
  ClipboardCopy,
  FileBadge,
  ShoppingCart,
  Signature,
  Table,
} from "lucide-react";
import { NoData } from "@/components/common/NoData";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import MerchandiseCard from "@/components/merchandise/MerchandiseCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import ContactModal from "@/components/forms/contact/ContactModal";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const Image = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-full object-cover rounded-xl" />
);

const items = [
  {
    name: "Tote Bag",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Image src={images.merch_1} alt="Tote Bag" />,
    // icon: <ClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    name: "Stickers",
    description: "Dive into the transformative power of technology.",
    header: <Image src={images.merch_2} alt="Stickers" />,
    // icon: <FileBadge className="h-4 w-4 text-neutral-500" />,
  },
  {
    name: "Key Laces",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Image src={images.merch_3} alt="Key Laces" />,
    // icon: <Signature className="h-4 w-4 text-neutral-500" />,
  },
  {
    name: "Stainless Cup",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Image src={images.merch_4} alt="Stainless cup" />,
    // icon: <Table className="h-4 w-4 text-neutral-500" />,
  },
  {
    name: "Bucket Hat",
    description: "Join the quest for understanding and enlightenment.",
    header: <Image src={images.merch_5} alt="Bucket Hat" />,
    // icon: <ArrowUpDown className="h-4 w-4 text-neutral-500" />,
  },
  {
    name: "Key Chain",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Image src={images.merch_6} alt="Key Chain" />,
    // icon: <BoxSelectIcon className="h-4 w-4 text-neutral-500" />,
  },
];
export default function Merchandise() {
  const [seeDetail, setSeeDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactData, setContactData] = useState({ subject: "", body: "" });

  const handleSeeDetail = (item) => {
    setSeeDetail(true);
    setSelectedItem(item);
  };

  const handleOrder = (item) => {
    const subject = `Order Request: ${item.name}`;
    const body = `Dear PCSI Team,\n\nI would like to order: ${item.name}\n\nPlease send me pricing and availability details.\n\nThank you.`;
    
    setContactData({ subject, body });
    setShowContactModal(true);
    setSeeDetail(false);
  };

  return (
    <div className="bg-accent py-20 space-y-5">
      <Container>
        <div className="flex flex-col  gap-5">
          <h1 className="font-serif text-4xl font-bold ">Merchandise</h1>
          {/* <Button
            className={"max-w-fit rounded-sm"}
            size={"lg"}
            variant={"outline"}
          >
            View All <ArrowRight />
          </Button> */}
        </div>
      </Container>

      <Container className={"w-full"}>
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
          {items.length === 0 && <NoData />}
          {items.length > 0 &&
            items.map((item, i) => (
              <MerchandiseCard
                key={i}
                image={item.header.props.src}
                name={item.name}
                onOrder={() => handleOrder(item)}
                onSeeDetail={() => handleSeeDetail(item)}
              />
            ))}
        </div>
      </Container>
      <Dialog open={seeDetail} onOpenChange={() => setSeeDetail(false)}>
        <DialogContent>
          <div>{selectedItem?.header}</div>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-bold ">
              {selectedItem?.name}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className={"mb-4"}>
            To purchase, send email to philcolsoc@gmail.com
          </DialogDescription>
          <Button 
            variant={"outline"}
            onClick={() => handleOrder(selectedItem)}
          >
            <ShoppingCart className=" h-4 w-4" />
            Order Now
          </Button>
        </DialogContent>
      </Dialog>

      <ContactModal
        open={showContactModal}
        onOpenChange={setShowContactModal}
        subject={contactData.subject}
        body={contactData.body}
      />
    </div>
  );
}
