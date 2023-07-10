import React, { useState, useRef, FormEvent } from "react";
import { CheckCircle, Warning } from "@phosphor-icons/react";

import { MessageType } from "@/lib/types";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [inspector, setInspector] = useState("");
  const [status, setStatus] = useState({
    hasError: false,
    isSubmitted: false,
    message: [] as MessageType[],
  });

  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const displayNotices = () => {
    // Make sure there are message(s) for notices.
    if (!status.message.length) {
      return;
    }

    // Icon
    const noticeIcon = (type: string) => {
      switch (type) {
        case "success":
          return <CheckCircle size={24} />;
        default:
          return <Warning size={24} />;
      }
    };

    // Notice
    const notice = (type: string, message: MessageType) => {
      let cssClasses = "border border-solid p-4 rounded mb-4 text-sm";

      switch (type) {
        case "success":
          cssClasses += " text-green-700 border-green-400 bg-green-50";
          break;
        default:
          cssClasses += " text-red-700 border-red-400 bg-red-50";
      }

      return (
        <div className={cssClasses}>
          <p className="flex gap-3 items-center">
            {noticeIcon(type)}
            <span className="flex-1">
              <strong>{message.title}: </strong>
              {message.description}.
            </span>
          </p>
        </div>
      );
    };

    // Output notice with a success information.
    if (status.isSubmitted && !status.hasError) {
      return notice("success", status.message[0]);
    }

    // Output notice with an error information.
    if (status.hasError) {
      let jsxErrors: JSX.Element[] = [];

      status.message.map((message, index) => {
        jsxErrors.push(<li key={index}>{notice("error", message)}</li>);
      });

      return <ul>{jsxErrors}</ul>;
    }
  };

  // Display error in input field.
  const displayInputError = (
    element: HTMLInputElement | HTMLTextAreaElement
  ) => {
    // Add CSS classes to the element.
    element.classList.add("placeholder:text-red-700", "border-red-400");
    // Remove CSS classes in the element.
    element.classList.remove("border-slate-300");
  };

  // Clear error in input field.
  const clearInputError = (element: HTMLInputElement) => {
    // Add CSS classes to the element.
    element.classList.add("border-slate-300");
    // Remove CSS classes in the element.
    element.classList.remove("border-red-400");
  };

  // Detect input focus.
  const handleOnBlur = (element: HTMLInputElement | HTMLTextAreaElement) => {
    if ("" !== element.value) {
      clearInputError(element as HTMLInputElement);
    } else {
      displayInputError(element);
    }
  };

  // Detect message submission.
  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Email data.
    let data = {
      name: firstName + " " + lastName,
      email,
      subject,
      message,
      inspector,
    };

    // Pattern for email address.
    const emailRegex = /\S+@\S+\.\S+/;

    // Check if the user entered a name; otherwise show an error.
    if (!firstName) {
      displayInputError(firstNameInputRef.current as HTMLInputElement);
    }

    if (!lastName) {
      displayInputError(lastNameInputRef.current as HTMLInputElement);
    }

    // Check if the user entered an email; otherwise show an error.
    if (!email) {
      displayInputError(emailInputRef.current as HTMLInputElement);
    } else {
      // Make sure the user entered a valid email; otherwise indicate an error.
      if (!emailRegex.test(email)) {
        displayInputError(emailInputRef.current as HTMLInputElement);
        setStatus({
          hasError: true,
          isSubmitted: false,
          message: [
            {
              title: "Email format is not valid",
              description:
                "please enter an email with a valid format and then try to send your message again",
            },
          ],
        });
      }
    }

    // Check if the user entered a subject; otherwise show an error.
    if (!subject) {
      displayInputError(subjectInputRef.current as HTMLInputElement);
    }

    // Check if the user entered a message; otherwise show an error.
    if (!message) {
      displayInputError(messageInputRef.current as HTMLTextAreaElement);
    }

    // Avoid a send action if fields are not filled or email address is not valid.
    if (
      !firstName ||
      !lastName ||
      !email ||
      !emailRegex.test(email) ||
      !subject ||
      !message
    ) {
      return;
    }

    // Make a request to send the email using API.
    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      // Display an error message.
      if (200 !== response.status) {
        setStatus({
          hasError: true,
          isSubmitted: false,
          message: [
            {
              title: "Message was not sent",
              description: "something went wrong, please try again later",
            },
          ],
        });

        return;
      }

      // Display a successful message.
      setStatus({
        hasError: false,
        isSubmitted: true,
        message: [
          {
            title: "Message sent",
            description: "thank you for your time writing this message",
          },
        ],
      });
    });
  };

  return (
    <form className="flex flex-col gap-y-8 items-center lg:items-start">
      {displayNotices()}

      <div className="flex flex-col gap-y-6 w-full">
        {/* first and last names */}
        <div className="flex gap-x-6">
          <div className="basis-1/2 space-y-3">
            <label htmlFor="firstName" className="block">
              First Name
            </label>
            <input
              type="text"
              ref={firstNameInputRef}
              className="border-0.5 border-light rounded-md block w-full px-2.5 py-3.5"
              name="firstName"
              value={firstName}
              placeholder="First Name"
              onChange={(event) => setFirstName(event.target.value)}
              onBlur={() =>
                handleOnBlur(firstNameInputRef.current as HTMLInputElement)
              }
            />
          </div>
          <div className="basis-1/2 space-y-3">
            <label htmlFor="lastName" className="block">
              Last Name
            </label>
            <input
              type="text"
              ref={lastNameInputRef}
              className="border-0.5 border-light rounded-md block w-full px-2.5 py-3.5"
              name="lastName"
              value={lastName}
              placeholder="First Name"
              onChange={(event) => setLastName(event.target.value)}
              onBlur={() =>
                handleOnBlur(lastNameInputRef.current as HTMLInputElement)
              }
            />
          </div>
        </div>

        {/* email */}
        <div className="space-y-3">
          <label htmlFor="email ">Email</label>
          <input
            type="email"
            ref={emailInputRef}
            className="border-0.5 border-light rounded-md block w-full px-2.5 py-3.5"
            name="email"
            value={email}
            placeholder="e.g. john.doe@example.com"
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() =>
              handleOnBlur(emailInputRef.current as HTMLInputElement)
            }
          />
        </div>

        {/* subject */}
        <div className="space-y-3">
          <label htmlFor="subject ">Subject</label>
          <input
            type="text"
            ref={subjectInputRef}
            className="border-0.5 border-light rounded-md block w-full px-2.5 py-3.5"
            name="subject"
            value={subject}
            placeholder="Subject"
            onChange={(event) => setSubject(event.target.value)}
            onBlur={() =>
              handleOnBlur(subjectInputRef.current as HTMLInputElement)
            }
          />
        </div>

        {/* message */}
        <div className="space-y-3">
          <label htmlFor="message ">Message</label>
          <textarea
            className="border-0.5 border-light rounded-md block w-full px-2.5 py-3.5"
            name="message"
            ref={messageInputRef}
            rows={4}
            placeholder="Write your message here"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onBlur={() =>
              handleOnBlur(messageInputRef.current as HTMLTextAreaElement)
            }
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-primary text-dark font-semibold px-4 py-5 rounded-md"
        onClick={(event) => handleSubmit(event)}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
