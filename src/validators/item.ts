import * as Yup from "yup";

interface ValidatorError {
  error: string;
  messages: unknown;
}

export const itemValidator = async (
  body: unknown
): Promise<void | ValidatorError> => {
  try {
    const schema = Yup.object().shape({
      item: Yup.string().required(),
    });

    await schema.validate(body, { abortEarly: false });
  } catch (error) {
    return { error: "Validation fails", messages: error.inner };
  }
};
