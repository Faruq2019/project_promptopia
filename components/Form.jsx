import Link from "next/link"

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-col flex-start">
      {/* Form Title */}
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      {/* Form Title */}

      {/* Form Description */}
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your imagination run wild any AI-powered platform.
      </p>
      {/* Form Description */}

      {/* Form Fields */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism "
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea 
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag &nbsp;
            <span className="font-normal ">
              ( #product, #webdevelopment, #idea #AI #ML )
            </span>
          </span>
          <input 
            type="text"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-10 gap-4">
          <Link 
            href={"/"}
            className="text-gray-500 text-sm"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {
              submitting ? `${type}...` : type
            }
          </button>
        </div>
      </form>
      {/* Form Fields */}
    </section>
  )
}

export default Form