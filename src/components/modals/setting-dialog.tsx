"use-client";

import {Dialog,DialogContent,DialogHeader} from "@/components/ui/dialog";
import { useSetting } from "../../../hooks/useSettings";
import { Label } from "../ui/label";
import { ModeToggle } from "../ui/moddle-toggle";

export const SettingsModel = () => {
    const settings = useSetting();

    
    return(
        <>
          <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-medium">
                        My Settings
                    </h2>
                </DialogHeader>
                <div className="flex item-center justify-between">
                   <div className="flex flex-col gap-y-1">
                       <Label>
                          Apperance
                       </Label>
                       <span className="text-[0.8rem] text-muted-foreground">
                          Customize how docwise looks on your device
                       </span>
                   </div>
                   <ModeToggle/>
                </div>
            </DialogContent>
          </Dialog>
        </>
    )
}