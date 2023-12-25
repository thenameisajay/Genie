import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sliders, GearSix } from "@phosphor-icons/react";
import toast from "react-hot-toast";

export function Configuration() {
  const options = ["Safe", "Moderate", "Risky"];

  return (
    <div className="relative mr-4 top-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-10">
            {/* <Sliders size={32} weight="fill" /> */}
            <GearSix size={36} color="#22b995" weight="duotone" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Model Configuration </DialogTitle>
            <DialogDescription>
              Make changes to the model here and save them to test the variation
              best suited for your needs.
              <br />
              <strong>Work on Progress 🚧</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Max Output Tokens
              </Label>
              <Input id="name" value=" " className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Safety
              </Label>
              <select id="safety" className="col-span-3">
                {options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => toast.success("Changes saved successfully!")}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
