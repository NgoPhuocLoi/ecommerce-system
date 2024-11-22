"use client";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { User } from "lucide-react";
import { Link } from "./editable/link";
import { useMemo, useState } from "react";
import { customerLogin, customerRegister } from "../actions/customer";
import { useAtom } from "jotai";
import { currentCustomerAtom } from "../atom/current-customer";
import clsx from "clsx";

interface AuthFormProps {
  onChangeMode: (mode: "login" | "register") => void;
  setOpenDialog: (open: boolean) => void;
}

const LoginForm = ({ onChangeMode, setOpenDialog }: AuthFormProps) => {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [, setCurrentCustomer] = useAtom(currentCustomerAtom);

  const onValueChange = (key: keyof typeof loginData, value: string) => {
    setLoginData((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await customerLogin(loginData);
      if (res.account) {
        setCurrentCustomer(res.account);
        setOpenDialog(false);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            value={loginData.email}
            onChange={(e) => onValueChange("email", e.target.value)}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Mật khẩu</Label>
            {/* <Link url="#">Quên mật khẩu?</Link> */}
          </div>
          <Input
            id="password"
            type="password"
            required
            value={loginData.password}
            onChange={(e) => onValueChange("password", e.target.value)}
          />
        </div>
        <Button onClick={handleLogin} type="submit" className="w-full">
          Đăng nhập
        </Button>
      </div>
      <div
        onClick={() => {
          onChangeMode("register");
        }}
        className="mt-4 text-center text-sm cursor-pointer"
      >
        Bạn chưa có tài khoản? Đăng ký ngay
      </div>
    </>
  );
};

const RegisterForm = ({ onChangeMode }: AuthFormProps) => {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);

  const onValueChange = (key: keyof typeof registerData, value: string) => {
    setRegisterData((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const newCustomer = await customerRegister(registerData);
      if (newCustomer) {
        onChangeMode("login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-4 grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="lastName">Họ</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Họ của bạn"
              required
              value={registerData.lastName}
              onChange={(e) => onValueChange("lastName", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="firstName">Tên của bạn</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Tên của bạn"
              required
              value={registerData.firstName}
              onChange={(e) => onValueChange("firstName", e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={registerData.email}
            onChange={(e) => onValueChange("email", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Mật khẩu</Label>
            {/* <Link url="#">Quên mật khẩu?</Link> */}
          </div>
          <Input
            id="password"
            type="password"
            required
            value={registerData.password}
            onChange={(e) => onValueChange("password", e.target.value)}
          />
        </div>
        <Button
          onClick={handleRegister}
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "..." : "Đăng ký"}
        </Button>
      </div>
      <div
        className="mt-4 text-center text-sm cursor-pointer"
        onClick={() => {
          onChangeMode("login");
        }}
      >
        Đã có tài khoản? Đăng nhập ngay
      </div>
    </>
  );
};

const CustomerAuthDialog = ({
  initialOpen,
  onClose,
}: {
  initialOpen?: boolean;
  onClose?: () => void;
}) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [openAuthDialog, setOpenAuthDialog] = useState(initialOpen ?? false);
  const isLogin = useMemo(() => mode === "login", [mode]);
  return (
    <Dialog
      open={openAuthDialog}
      onOpenChange={(value) => {
        if (!value && onClose) {
          onClose();
        }
        setOpenAuthDialog(value);
      }}
    >
      <DialogTrigger asChild>
        <div
          className={clsx(
            "p-2 rounded-md hover:bg-white hover:text-black text-white cursor-pointer duration-100",
            {
              hidden: initialOpen,
            },
          )}
        >
          <User size={24} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Đăng nhập" : "Đăng ký"}</DialogTitle>
        </DialogHeader>

        {isLogin ? (
          <LoginForm setOpenDialog={setOpenAuthDialog} onChangeMode={setMode} />
        ) : (
          <RegisterForm
            setOpenDialog={setOpenAuthDialog}
            onChangeMode={setMode}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomerAuthDialog;
