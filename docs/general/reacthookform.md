Adding React Hook Form to a Component
=====================================

React Hook Form is a library for managing form state and validation in React applications. This guide will walk you through the process of adding React Hook Form to a component in your project.

Step 1: Install Dependencies
----------------------------

Before you begin, make sure you have the required dependencies installed in your project. React Hook Form relies on the `react-hook-form` package for form management.

`npm install react-hook-form`

Step 2: Import Dependencies
---------------------------

In your component file, import the necessary dependencies from the packages you'll be using, as well as any other components or utilities you need.
```
import { Controller, useForm, Form } from 'react-hook-form';
import * as formValidations from 'utils/formValidations'; // Import your form validation functions
```

Step 3: Create the Form Component
---------------------------------

Now, create your form component using the React Hook Form library. Here's a basic example:

```function YourFormComponent() {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [dateRange, setDateRange] = useState();

  const onSubmit = data => {
    const requestBody = { ...data, rangePicker: dateRange };
    console.log(requestBody);
    // Note: Add API Call or data handling logic here
  };

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}

export default YourFormComponent;
```

Step 4: Implement Form Fields
-----------------------------

Inside the `return` statement of your component, implement your form fields using the `Controller` component provided by React Hook Form. Here's an example of how to create different types of form fields:

```
<FormItem>
  <label htmlFor="firstName">First Name: </label>
  <Controller
    control={control}
    name="firstName"
    rules={{
      required: formValidations.VALIDATION_MESSAGES.REQUIRED,
    }}
    render={({ field }) => (
      <Input
        id="firstName"
        style={{ borderColor: `${errors.firstName ? 'red' : ''}` }}
        placeholder="Please Enter First Name"
        {...field}
      />
    )}
  />
  {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName.message}</p>}
</FormItem>
```

Repeat this structure for each form field, modifying the `name`, `rules`, and `render` attributes accordingly.

Step 5: Handle Form Submission
------------------------------

Handle the form submission by attaching the `handleSubmit` function to your form element and passing in the `onSubmit` function you've defined.
```
<Form control={control} onSubmit={handleSubmit(onSubmit)}>
  {/* Your form fields */}
</Form>
```

Step 6: Resetting Form and Handling Other Actions
-------------------------------------------------

You can include actions like resetting the form and handling other actions as needed. Here's an example of a button that clears form values and resets the date range picker:
```
<Button
  onClick={() => {
    reset({});
    setValue('rangePicker', null);
    setDateRange(null);
  }}
>
  Clear Values
</Button>
```

Step 7: Styling and UI
----------------------

You can style your form and its elements using CSS or styled components, depending on your project's styling approach. Remember to import your styled components if necessary.

Step 8: Export and Use
----------------------

Finally, export your form component and use it in your application where needed.

Conclusion
----------

Congratulations! You've successfully added React Hook Form to your component. This library simplifies form management, validation, and submission in React applications.