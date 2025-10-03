export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using RestroVibe Restaurant Management System, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of RestroVibe per device for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Service Description</h2>
          <p>
            RestroVibe provides restaurant management services including but not limited to order management, menu management, table reservations, staff management, and analytics.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Responsibilities</h2>
          <p>
            Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Privacy Policy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at support@restrovibe.com
          </p>
        </div>
      </div>
    </div>
  )
}
