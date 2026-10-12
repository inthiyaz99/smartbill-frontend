import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const API_URL = "https://smartbill-backend-b4wb.onrender.com"

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (password.length < 8) {
      alert("Password must contain at least 8 characters")
      return
    }

    const user = {
      fullName: name.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      password,
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
        body: JSON.stringify(user),
      })

      const result = await response.text()

      if (!response.ok) {
        throw new Error(result || `Registration failed (${response.status})`)
      }

      alert("Account created successfully! Please log in.")
      navigate("/login")
    } catch (error) {
      console.error("Registration error:", error)

      if (error instanceof TypeError) {
        alert(
          "Cannot connect to the backend. Please check the Render service and CORS settings."
        )
      } else {
        alert(error.message || "Registration failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="energy-orb orb-one"></div>
        <div className="energy-orb orb-two"></div>
        <div className="energy-orb orb-three"></div>
      </div>

      <div className="auth-card register-card">
        <div className="auth-logo">
          <span>⚡</span>
        </div>

        <div className="auth-status">
          <span></span>
          SMART GRID ONLINE
        </div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join SmartBill and manage your electricity smarter
        </p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="fullName">Full Name</label>
            <div className="auth-input">
              <span>◉</span>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <div className="auth-input">
              <span>✉</span>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="mobile">Mobile Number</label>
            <div className="auth-input">
              <span>◉</span>
              <input
                id="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                autoComplete="tel"
                maxLength={15}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <div className="auth-input">
              <span>⌁</span>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="auth-input">
              <span>⌁</span>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE SMARTBILL ACCOUNT"}
            <span>→</span>
          </button>
        </form>

        <div className="auth-divider">
          <span></span>
          SECURE REGISTRATION
          <span></span>
        </div>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <div className="auth-security">
          <span>🔒</span>
          Your password is securely hashed before storage
        </div>
      </div>
    </div>
  )
}

export default Register
