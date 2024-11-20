import Image from "next/image";
import logoPng from "@repo/common/images/logo.png";

export default function DefautlLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="bg-muted relative hidden h-full flex-col p-10 px-6 text-white dark:border-r lg:flex">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(2,8,8,.5),transparent 20%,transparent 90%,rgba(2,8,8,.5)),radial-gradient(at 87% 84%,rgba(2,8,8,.9) 0,transparent 50%),radial-gradient(at 10% 8%,rgba(2,8,8,.9) 0,transparent 50%),radial-gradient(at 65% 36%,rgba(63,63,75,.5) 0,transparent 50%),radial-gradient(at 38% 61%,rgba(63,63,75,.5) 0,transparent 50%),radial-gradient(at 99% 36%,rgba(63,63,75,.5) 0,transparent 50%),radial-gradient(at 0 62%,rgba(63,63,75,.5) 0,transparent 50%),linear-gradient(#09090a,#09090a)",
          }}
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
            src={logoPng}
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full mx-2"
          />
          My Ecommerce
        </div>
        <div className="relative z-20 my-auto flex flex-col gap-4">
          <h1 className="text-3xl mb-8 text-center">
            Bắt đầu kinh doanh cửa hàng của bạn ngay
          </h1>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-2 grid-rows-3 gap-2">
              <Image
                src="https://cdn.shopify.com/b/shopify-brochure2-assets/36138f611ff7a9bb25d679290f623a99.jpg?originalWidth=562&originalHeight=750&width=400"
                alt="Test"
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-lg row-span-3 row-start-1 w-full h-auto aspect-[2/3]"
              />
              <Image
                src="https://cdn.shopify.com/b/shopify-brochure2-assets/ce0048c94b712ae773a1f6371ced6303.jpg?originalWidth=576&originalHeight=747&width=400"
                alt="Test"
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-lg row-span-3 row-start-2 w-full h-auto aspect-[2/3]"
              />
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex gap-6">
                <span className="text-lg text-green-500">01</span>
                <p className="text-xl underline underline-offset-[10px]">
                  Thêm sản phẩm đầu tiên
                </p>
              </div>

              <div className="flex gap-6">
                <span className="text-lg text-green-500">02</span>
                <p className="text-xl underline underline-offset-[10px]">
                  Tùy chỉnh giao diện cửa hàng
                </p>
              </div>

              <div className="flex gap-6">
                <span className="text-lg text-green-500">03</span>
                <p className="text-xl underline underline-offset-[10px]">
                  Bắt đầu bán hàng
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            {/* <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer> */}
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 px-[100px]">
          {children}
        </div>
      </div>
    </div>
  );
}
