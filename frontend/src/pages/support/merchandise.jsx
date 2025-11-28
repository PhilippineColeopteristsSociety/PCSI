import React, { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import ContactModal from "@/components/forms/contact/ContactModal";
import merchandiseService from "@/services/merchandiseService";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// const Skeleton = () => (
//   <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
// );

const Image = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-full object-cover rounded-xl" />
);

export default function Merchandise() {
  const [seeDetail, setSeeDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactData, setContactData] = useState({ subject: "", body: "" });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch active merchandise on component mount
  useEffect(() => {
    const fetchMerchandise = async () => {
      setLoading(true);
      try {
        const result = await merchandiseService.getAllMerchandise();
        if (result.success) {
          // Filter only active merchandise (status === "1")
          const activeMerchandise =
            result?.data?.data?.filter((merch) => merch.status === "1") || [];

          // Map to the format expected by the component
          const formattedItems = activeMerchandise.map((merch) => ({
            _id: merch._id,
            name: merch.name,
            description: merch.description,
            header: <Image src={merch.banner} alt={merch.name} />,
            banner: merch.banner,
          }));

          setItems(formattedItems);
        } else {
          toast.error(result.error || "Failed to fetch merchandise");
        }
      } catch (error) {
        console.error("Error fetching merchandise:", error);
        toast.error("Failed to fetch merchandise");
      } finally {
        setLoading(false);
      }
    };

    fetchMerchandise();
  }, []);

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

  if (loading) {
    return (
      <div className="bg-accent py-20 space-y-5">
        <Container>
          <div className="flex flex-col  gap-5">
            <h1 className="font-serif text-4xl font-bold ">Merchandise</h1>
          </div>
        </Container>
        <Container className={"w-full"}>
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-square bg-neutral-300 rounded-lg" />
            ))}
          </div>
        </Container>
      </div>
    );
  }

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
        {items.length === 0 && (
          <NoData
            title={"No Merchandise Available"}
            description={
              "Check back soon for updates on our latest merchandise."
            }
          />
        )}
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
          {items.length > 0 &&
            items.map((item, i) => (
              <MerchandiseCard
                key={i}
                image={item.banner || item.header.props.src}
                name={item.name}
                onOrder={() => handleOrder(item)}
                onSeeDetail={() => handleSeeDetail(item)}
              />
            ))}
        </div>
      </Container>
      <Dialog open={seeDetail} onOpenChange={() => setSeeDetail(false)}>
        <DialogContent>
          {selectedItem?.banner ? (
            <div>{selectedItem?.header}</div>
          ) : (
            <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100"></div>
          )}
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-bold ">
              {selectedItem?.name}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className={"mb-4"}>
            To purchase, send email to philcolsoc@gmail.com
          </DialogDescription>
          <Button variant={"outline"} onClick={() => handleOrder(selectedItem)}>
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
