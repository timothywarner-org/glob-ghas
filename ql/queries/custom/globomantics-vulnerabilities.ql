/**
 * @name Globomantics Security Vulnerabilities
 * @description Detects common security vulnerabilities in the Globomantics Code Review Assistant
 * @kind problem
 * @problem.severity error
 * @security-severity 9.8
 */

import javascript
import javascript.security.SQLInjection
import javascript.security.CommandInjection
import javascript.security.PathTraversal
import javascript.security.WeakCryptography
import javascript.security.HardcodedCredentials

class GlobomanticsVulnerability extends DataFlow::PathNode {
  GlobomanticsVulnerability() {
    this instanceof SQLInjectionSink or
    this instanceof CommandInjectionSink or
    this instanceof PathTraversalSink or
    this instanceof WeakCryptographySink or
    this instanceof HardcodedCredentialsSink
  }
}

class GlobomanticsSource extends DataFlow::Node {
  GlobomanticsSource() {
    this instanceof DataFlow::Parameter or
    this instanceof DataFlow::GlobalVariable or
    this instanceof DataFlow::PropertyRead
  }
}

from GlobomanticsSource source, GlobomanticsVulnerability sink
where DataFlow::localFlow(source, sink)
select sink, "Security vulnerability: $@", sink, sink.getDescription() 