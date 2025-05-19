// form.jsx

import React, { createContext, forwardRef, useId } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Controller, FormProvider } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

const FormFieldContext = createContext({});
const FormItemContext = createContext({});

const FormField = (props) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
);

const FormItem = forwardRef(({ className, ...props }, ref) => {
  const id = useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = forwardRef(({ className, ...props }, ref) => (
  <Label ref={ref} className={cn(className)} {...props} />
));
FormLabel.displayName = "FormLabel";

const FormControl = forwardRef(({ ...props }, ref) => (
  <Slot ref={ref} {...props} />
));
FormControl.displayName = "FormControl";

const FormDescription = forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
FormDescription.displayName = "FormDescription";

const FormMessage = forwardRef(({ className, children, ...props }, ref) => {
  if (!children) return null;
  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};