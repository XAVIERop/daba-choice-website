import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background font-sans">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12 rounded-3xl border border-white/5"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 gold-gradient-text">PRIVACY <span className="text-white">POLICY</span></h1>
          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">Introduction</h2>
              <p>
                At Daba Choice, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">Data We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which you provide voluntarily when using our services, including:
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li><strong>Identity Data:</strong> Name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> Delivery address, email address and telephone numbers.</li>
                <li><strong>Transaction Data:</strong> Details about orders you have placed via WhatsApp or our interface.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">How We Use Your Data</h2>
              <p>
                We will only use your personal data for the purpose of:
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Processing and delivering your food orders.</li>
                <li>Managing table reservations.</li>
                <li>Improving our website and service quality.</li>
                <li>Communicating with you regarding your inquiries.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">WhatsApp Integration</h2>
              <p>
                Our ordering and reservation systems utilize WhatsApp for communication. By using these features, you acknowledge that your contact details and order information will be shared with us via the WhatsApp platform, which is subject to its own privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <p className="mt-4 text-primary font-bold">
                +971 50 424 7836<br />
                +971 4 577 0225
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
