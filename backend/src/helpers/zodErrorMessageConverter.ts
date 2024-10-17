import { ZodError } from "zod";

const zodErrorMessageConverter = (error: ZodError) => {
  const allMessages = error.errors.map((err) => err.message).filter(Boolean);

  return allMessages.join(", ");
};

export default zodErrorMessageConverter;
