import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Label } from "@repo/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import React from "react";

interface IProductStatusProps {
  initialStatus?: boolean;
}

const ProductStatus = ({ initialStatus }: IProductStatusProps) => {
  return (
    <div>
      <Card x-chunk="dashboard-07-chunk-3">
        <CardHeader>
          <CardTitle>Trạng thái sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                defaultValue={initialStatus === true ? "true" : "false"}
                name="isActive"
              >
                <SelectTrigger id="status" aria-label="Select status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">Nháp</SelectItem>
                  <SelectItem value="true">Hiển thị</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductStatus;
