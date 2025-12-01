import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Textarea,
} from "@/components/ui";
import { FileUploader } from "@/components/shared";
import { useCloudinaryUpload } from "@/hooks";
import { PostValidation, PostValidationType } from "./schema";
import { useCreatePost } from "./hooks/useCreatePost";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { uploadImage, isUploading, uploadProgress, error } =
    useCloudinaryUpload();
  const { mutateAsync: createPost, isLoading } = useCreatePost();

  const form = useForm<PostValidationType>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  const handleSubmit = async (value: PostValidationType) => {
    let uploadedImageUrl: string | undefined = undefined;

    if (value.file && value.file.length > 0) {
      const file = value.file[0];
      const url = await uploadImage(file);
      if (url) {
        uploadedImageUrl = url;
      }
    }
    await createPost({
      caption: value.caption,
      location: value.location,
      tags: value.tags ? value.tags.split(",").map((tag) => tag.trim()) : [],
      imageUrl: uploadedImageUrl,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full  max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={(files) => {
                    field.onChange(files);
                  }}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Upload Progress */}
        {isUploading && uploadProgress && (
          <div className="w-full">
            <FormLabel className="shad-form_label mb-2 block">
              Uploading... {uploadProgress.percentage}%
            </FormLabel>
            <div className="w-full bg-dark-4 rounded-full h-2.5">
              <div
                className="bg-primary-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress.percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="w-full p-4 bg-red-500/10 border border-red-500 rounded-lg">
            <p className="text-red-500 text-sm">{error.message}</p>
          </div>
        )}

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
            disabled={isUploading || isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isUploading || isLoading}
            isLoading={isUploading || isLoading}>
            {isUploading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </div>
            ) : (
              `${action} Post`
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
