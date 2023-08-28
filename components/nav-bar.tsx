"use client";

import { form, navButtons, navBarClassName } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function NavBar(props: { userId: number; form: form; route: string }) {
  const { userId, form, route } = props;
  const router = useRouter();
  const buttons = navButtons.map((navButton: any) => {
    let notCompleted = !(form as any)[navButton.completeLookupFields];
    if (navButton.completeLookupFields === "all") {
      notCompleted = !(form.residency_type && form.residency_date && form.residency_address);
    }
    navButton["notCompleted"] = notCompleted;
    return navButton;
  });

  const onClick = (route: string) => {
    router.push(`/${userId}/${form.id}${route}`);
  };

  return (
    <div className="max-w-xl mx-auto w-full pb-4">
      {buttons.map(button => (
        <button
          key={button.label}
          className={navBarClassName
            .concat(button.notCompleted ? "bg-gray-400/20 " : "bg-green-300 ")
            .concat(route === button.route ? "border-black" : "border-gray-400")}
          onClick={() => onClick(button.route)}
          disabled={button.notCompleted}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}
