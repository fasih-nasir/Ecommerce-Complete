import React from "react";

function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "3070b740-35cc-4484-b4bb-b8c09ba5ee2c");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container  px-5 py-5 mx-auto">
        <div className="flex flex-col text-center py-4 w-full mb-12">
         
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            We'd love to hear from you. Please fill out the form below to get in touch.
          </p>
        </div>
                 
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "40vh" }}>
  <form onSubmit={onSubmit} className="col-9 col-md-6 d-flex flex-column justify-content-center align-items-center">
    <div className="col-12 p-2 w-full">
      <input
        type="text"
        id="name"
        placeholder="Your Name"
        name="name"
        required
        className="w-100 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
    </div>
    <div className="col-12 p-2 w-full">
      <input
        type="email"
        placeholder="Your Email"
        id="email"
        name="email"
        required
        className="w-100 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
    </div>
    <div className="col-12 p-2 w-full">
      <textarea
        id="message"
        name="message"
        required
        placeholder="Your Message"
        className="w-100 h-32 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
      ></textarea>
    </div>
    <div className="p-2 w-full">
      <button className="seemore p-2 flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Submit
      </button>
    </div>
    <span className="text-center text-gray-700 w-full">{result}</span>
  </form>
</div>

      </div>
    </section>
  );
}

export default Contact;
