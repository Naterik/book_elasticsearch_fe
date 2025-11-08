import { Button } from "@/components/ui/button";

const MembershipCTA = ({ onRegister }: { onRegister: () => void }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
          Join Our Reading Community Today!
        </h2>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
          Unlimited access to the library, reserve your favorite books, receive
          notifications, and many more exclusive benefits.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 ">
          <Button
            size="lg"
            onClick={onRegister}
            className="bg-white text-blue-600 hover:bg-gray-400 text-lg px-8 shadow-xl "
          >
            Register Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MembershipCTA;
